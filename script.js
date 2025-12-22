// === DISCORD PROFILE ===
const userId = "424680239067824129"; // <-- ESTE ES EL PERFIL QUE SE VE

const api = `https://api.lanyard.rest/v1/users/${userId}`;

async function loadDiscord() {
  try {
    const res = await fetch(api);
    const json = await res.json();
    const data = json.data;

    document.getElementById("discord-name").textContent =
      data.discord_user.global_name || data.discord_user.username;

    const avatar = data.discord_user.avatar
      ? `https://cdn.discordapp.com/avatars/${userId}/${data.discord_user.avatar}.png?size=128`
      : "https://cdn.discordapp.com/embed/avatars/0.png";

    document.getElementById("discord-avatar").src = avatar;

    const statusDot = document.getElementById("discord-status");
    const colors = {
      online: "bg-green-500",
      idle: "bg-yellow-400",
      dnd: "bg-red-500",
      offline: "bg-gray-500"
    };

    statusDot.className =
      `absolute bottom-0 right-0 w-5 h-5 border-4 border-zinc-900 rounded-full rounded-full ` +
      (colors[data.discord_status] || "bg-gray-500");

    const activity = data.activities.find(a => a.type === 0 || a.type === 2);
    document.getElementById("discord-activity").textContent =
      activity ? activity.name : "No activity";
  } catch (e) {
    console.error("Discord error:", e);
  }
}

loadDiscord();
setInterval(loadDiscord, 15000);
