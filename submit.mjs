import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/indexing"],
});

const urls = [
  "https://gosailor.in/blog/australia-travel-guide.html",
  "https://gosailor.in/blog/bali-travel-guide.html",
  "https://gosailor.in/blog/bangkok-guide.html",
  "https://gosailor.in/blog/cheap-flights-india.html",
  "https://gosailor.in/blog/croatia-travel-guide.html",
  "https://gosailor.in/blog/dubai-guide.html",
  "https://gosailor.in/blog/find-cheap-flights-ai-2026.html",
  "https://gosailor.in/blog/flight-compensation.html",
  "https://gosailor.in/blog/greece-santorini-guide.html",
  "https://gosailor.in/blog/index.html",
  "https://gosailor.in/blog/istanbul-turkey-guide.html",
  "https://gosailor.in/blog/london-uk-guide.html",
  "https://gosailor.in/blog/malaysia-travel-guide.html",
  "https://gosailor.in/blog/maldives-travel-guide.html",
  "https://gosailor.in/blog/new-york-usa-guide.html",
  "https://gosailor.in/blog/paris-france-guide.html",
  "https://gosailor.in/blog/passport-validity-guide.html",
  "https://gosailor.in/blog/rome-italy-guide.html",
  "https://gosailor.in/blog/singapore-guide.html",
  "https://gosailor.in/blog/spain-barcelona-guide.html",
  "https://gosailor.in/blog/thailand-safe-solo-female.html",
  "https://gosailor.in/blog/tokyo-japan-guide.html",
  "https://gosailor.in/blog/travel-hacks-long-flights.html",
  "https://gosailor.in/blog/vietnam-travel-guide.html",
  "https://gosailor.in/blog/week-in-bali-cost-2026.html",
  "https://gosailor.in/blog/yacht-cruise-guide.html",
];

async function submit() {
  const client = await auth.getClient();
  for (const url of urls) {
    try {
      await client.request({
        url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
        method: "POST",
        data: { url, type: "URL_UPDATED" },
      });
      console.log("✅ " + url);
    } catch (e) {
      console.error("❌ " + url, e.message);
    }
  }
}

submit();
