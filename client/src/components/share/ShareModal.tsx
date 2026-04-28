import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Copy, Download, ExternalLink, Share2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/utils/clipboard";
import { renderSvgToPngBlob, downloadBlob } from "@/components/share/renderToPng";
import type { DashboardStats } from "@/types/dashboard";
import { renderProgressCard } from "@/components/share/templates/progress";
import logoSvg from "@/assets/sql-arena.svg?raw";

export function ShareModal(props: {
  userName?: string | null;
  stats: DashboardStats | null;
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  const rendered = useMemo(() => {
    return renderProgressCard({ logoSvg, stats: props.stats });
  }, [props.stats]);

  const previewSvg = rendered.svg;
  const caption = rendered.caption;

  const onCopy = async () => {
    const ok = await copyToClipboard(caption);
    if (ok) toast.success("Copied caption");
    else toast.error("Copy failed");
  };

  const onDownload = async () => {
    try {
      const blob = await renderSvgToPngBlob(previewSvg, 1080);
      downloadBlob(blob, `sql-arena-share-progress.png`);
      toast.success("Downloaded PNG");
    } catch (e) {
      toast.error("Download failed");
    }
  };

  const onShareLinkedIn = async () => {
    const ok = await copyToClipboard(caption);
    if (ok) toast.success("Copied caption");
    else toast.error("Copy failed");
    window.open("https://www.linkedin.com/feed/?shareActive=true", "_blank", "noopener,noreferrer");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold",
            "border border-[color:rgb(37_99_235/0.35)] text-[var(--arena-primary)]",
            "hover:bg-[color-mix(in_srgb,var(--arena-primary)_18%,transparent)] transition-colors",
            props.triggerClassName,
          )}
        >
          <Share2 className="h-4 w-4" />
          {props.triggerLabel ?? "Share progress"}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[980px] p-0 overflow-hidden">
        <div className="p-6 border-b arena-border-divider">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
          </DialogHeader>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Button variant="default" onClick={onDownload} className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download PNG (1080×1080)
              </Button>
              <Button variant="outline" onClick={onCopy} className="w-full gap-2">
                <Copy className="h-4 w-4" />
                Copy caption
              </Button>
              <Button
                onClick={onShareLinkedIn}
                className={cn(
                  "w-full gap-2 text-white border border-white/10",
                  "bg-[#0A66C2] hover:bg-[#0959A9] active:bg-[#084D92]",
                )}
              >
                <ExternalLink className="h-4 w-4" />
                Share on LinkedIn
              </Button>
            </div>

            <div className="rounded-xl border arena-border-divider p-4 bg-[var(--arena-surface-container-lowest)]">
              <div className="text-xs font-bold tracking-wider uppercase text-[var(--arena-outline)] mb-2">
                Caption preview
              </div>
              <pre className="text-xs whitespace-pre-wrap text-[var(--arena-text)] leading-relaxed">
                {caption}
              </pre>
            </div>
          </div>

          <div className="rounded-2xl border arena-border-divider bg-[var(--arena-surface-container-lowest)] p-4 flex items-center justify-center">
            <div className="w-full max-w-[540px]">
              <div
                className={cn(
                  "w-full aspect-square rounded-xl overflow-hidden",
                  "[&>svg]:w-full [&>svg]:h-full [&>svg]:block",
                )}
                dangerouslySetInnerHTML={{ __html: previewSvg }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
