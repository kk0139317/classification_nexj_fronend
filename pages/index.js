import Image from "next/image";
import { Inter } from "next/font/google";
import HeroSection from "@/components/HeroSection";
import NewsSection from "@/components/NewsSection";
import LogoGrid from "@/components/LogoGrid";
import StepSection from "@/components/StepsSection";
import Team from "@/components/Team";
import Testemonial from "@/components/Testemonials";
import Pricing from "@/components/Procing";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  return (
    <>
    <HeroSection/>
    {/* <NewsSection/> */}
    <StepSection/>
    <LogoGrid/>
    <Team/>
    <Pricing/>
    <Testemonial/>
    </>
  );
}
