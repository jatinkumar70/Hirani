import Image from "next/image";
import image1 from "../../../asserts/img/palm.jpeg"
import { BedDouble, Bath, Users, Calendar, Phone, Mail } from "lucide-react"
import { Button } from "../../components/ui/Button/Button";

export const Frame = () => {
    return (
        <div className="space-y-6 md:sticky right w-[30%] align-center md:top-6 md:h-[calc(100vh-2rem)]">
            <div className="space-y-6 overflow-y-auto md:max-h-[calc(100vh-6rem)]">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                        src={image1.src}
                        alt="Luxury apartment interior with city view"
                        fill
                        className="object-cover"
                    />
                </div>

                <p className="text-sm text-center">Experience chic sophistication with stunning views</p>

                <div className="grid grid-cols-4 gap-4 text-center">
                    <div className="flex flex-col items-center">
                        <BedDouble className="h-5 w-5 mb-1" />
                        <span className="text-sm">2 beds</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <BedDouble className="h-5 w-5 mb-1" />
                        <span className="text-sm">1 bedrooms</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Users className="h-5 w-5 mb-1" />
                        <span className="text-sm">4 guests</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <Bath className="h-5 w-5 mb-1" />
                        <span className="text-sm">2 baths</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-center items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>27-30th of June, 2024</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Phone className="h-5 w-5" />
                        <span>+44 789234587</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Mail className="h-5 w-5" />
                        <span>somename@mail.com</span>
                    </div>
                </div>

                <div className="flex justify-center items-center"><Button variant="outline" className="w-1/3 border border-black">
                    Cancel booking
                </Button></div>
                
            </div>
        </div>
    );
}