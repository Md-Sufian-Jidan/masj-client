import Logo from "@/src/app/assets/svgs/logo";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/products", label: "App Products" },
        { href: "/about", label: "About Us" },
        { href: "/testimonial", label: "Testimonial" },
        { href: "/blogs", label: "Blogs" },
        { href: "/contact", label: "Contact Us" },
    ];

    const socialLinks = [
        { href: "#", icon: FaFacebookF },
        { href: "#", icon: FaInstagram },
        { href: "#", icon: FaXTwitter },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-black flex items-center gap-2">
                        <Logo />
                        Next Mart
                    </h1>

                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Save big this Black Friday with unbeatable deals on tech, home
                        essentials, fashion, and more. Limited stock available.
                    </p>
                </div>

                <hr className="my-8" />

                <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-gray-800">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className="transition-colors hover:text-purple-600"
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex justify-center gap-4 mt-8">
                    {socialLinks.map(({ href, icon: Icon }, index) => (
                        <Link
                            key={index}
                            href={href}
                            className="p-2 rounded-full border border-gray-200 text-gray-600 hover:text-purple-600 hover:border-purple-600 transition-all"
                        >
                            <Icon size={18} />
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;