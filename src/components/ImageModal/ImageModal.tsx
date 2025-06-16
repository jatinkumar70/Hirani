import { GridImage } from "../../types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/Dialog/Dialog";
import Image from "next/image";

interface ImageModalProps {
  image: GridImage | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ImageModal({ image, isOpen, onClose }: ImageModalProps) {
  if (!image) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] md:max-w-[550px] border-none">
        <DialogHeader className="mb-4 p-1">
          <DialogTitle className="text-lg -mt-5 mb-2">
            {image.title}
          </DialogTitle>
          <DialogDescription className="text-sm">
            {image.description}
          </DialogDescription>
        </DialogHeader>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl">
          <Image
            src={image.src || "/placeholder.svg"}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 700px"
          />
        </div>
        <div className="mt-4">
          <h4 className="font-semibold">Nearby Hotel</h4>
          <p>{image.hotelLocation}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
