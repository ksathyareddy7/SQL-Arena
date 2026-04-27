import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import aboutPlatformMd from "@/content/aboutPlatform.md?raw";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const TEMPLATE = `🚀 Lately, I’ve been practicing SQL on a platform that actually feels close to real-world work — not just textbook problems.

It’s called SQL Arena, and honestly, it’s been a refreshing change from the usual practice sites.

💡 What stood out to me:
• Problems are based on real-world domains (Social, Ecommerce, Banking, etc.)
• Datasets are large and realistic — not simplified toy tables
• Strict validation (ordering, edge cases, etc.)
• Clean SQL editor + schema explorer
• Multiple solution approaches

🔗 GitHub: YOUR_GITHUB_LINK

Kudos to @Sathya Reddy for building this 👏`;

export default function About() {
  const handleShareOnLinkedIn = async () => {
    try {
      await navigator.clipboard.writeText(TEMPLATE);
      toast.success("Copied share text. Paste it into your LinkedIn post.");
      setTimeout(() => {
        window.open(
          "https://www.linkedin.com/feed/?shareActive=true",
          "_blank",
          "noopener,noreferrer",
        );
      }, 1000);
    } catch {
      toast.error("Could not copy share text. Copy it manually from the page.");
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      <section>
        <h2 className="text-3xl font-extrabold tracking-tight">About Me</h2>

        <div className="mt-10 arena-bg-lowest rounded-xl border border-[color:rgb(194_198_214/0.12)] dark:border-[color:rgb(42_51_66/0.7)] p-8">
          <p className="text-[color:rgb(11_28_48/0.82)] dark:text-[color:rgb(244_244_245/0.92)] text-lg leading-relaxed">
            Hello 👋, my name is{" "}
            <a
              href="https://www.linkedin.com/in/ksathyareddy7/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              <strong>Sathya Reddy</strong>
            </a>
            . I’m a Senior Software Engineer with 8+ years of experience,
            building scalable and user-focused web applications.
          </p>
          <p className="mt-4 text-[color:rgb(11_28_48/0.82)] dark:text-[color:rgb(244_244_245/0.92)] text-lg leading-relaxed">
            Over time, I’ve developed a strong interest in teaching and
            simplifying complex technical concepts. I enjoy breaking down
            problems into intuitive mental models and creating learning
            experiences that are both practical and engaging.
          </p>
        </div>
      </section>
      <section className="mt-7">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-extrabold tracking-tight">
            About Platform
          </h2>
          <Button
            type="button"
            onClick={handleShareOnLinkedIn}
            size="lg"
            className="bg-[#0A66C2] text-white font-bold text-lg p-6 hover:bg-[#004182] focus-visible:ring-[#0A66C2]/35"
          >
            Share on LinkedIn
          </Button>
        </div>
        <div className="mt-10">
          <MarkdownRenderer content={aboutPlatformMd} />
        </div>
      </section>
    </div>
  );
}
