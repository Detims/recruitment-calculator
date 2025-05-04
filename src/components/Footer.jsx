import { FaSquareXTwitter } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { AiFillTikTok } from "react-icons/ai";

const Footer = () => {
    return(
        <footer className="bg-green-900 flex flex-col items-center justify-center text-white text-center text-2xl font-bold p-8">
            <div className="flex gap-4 pb-3">
                <FaSquareXTwitter className="footer__icon hover:shadow-md" />
                <RiInstagramFill className="footer__icon hover:shadow-md" />
                <AiFillTikTok className="footer__icon hover:shadow-md" />
            </div>
            Contact Us
        </footer>
    )
}

export default Footer