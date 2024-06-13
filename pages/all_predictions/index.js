import UploadImage from "@/components/UploadImage";
import { Inter } from "next/font/google";
import Testemonial from "@/components/Testemonials";
import PredictionsTable from "@/components/PredictionTable";
const inter = Inter({ subsets: ["latin"] });
export default function Home() {
    return (
        <>
            <PredictionsTable />
            <Testemonial />
        </>
    );
}
