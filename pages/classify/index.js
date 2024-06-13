import UploadImage from "@/components/UploadImage";
import { Inter } from "next/font/google";
import UploadHeroSection from "@/components/UploadImage/main_page";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
    return (
        <>
        {/* <UploadImage/> */}
        <UploadHeroSection/>
        </>
    );
}
