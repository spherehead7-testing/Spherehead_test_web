import Image from "next/image";
import BlueLargeRightArrow from "@/components/ui/blue-large-right-arrow";

const technologies = [
    {
        name: "Power BI",
        src: "/images/icons/Power_BI-Logo.wine 1.svg",
        width: 78,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "Terraform",
        src: "/images/icons/tensorflow.svg",
        width: 78,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "Docker",
        src: "/images/icons/docker.svg",
        width: 90,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "Python",
        src: "/images/icons/Python.svg",
        width: 82,
        height: 82,
        className: "h-[64px] w-auto lg:h-[80px]",
    },
    {
        name: "AWS",
        src: "/images/icons/aws.svg",
        width: 110,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "Microsoft Azure",
        src: "/images/icons/microsoft_azure.svg",
        width: 92,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "PyTorch",
        src: "/images/icons/pytorch.svg",
        width: 78,
        height: 78,
        className: "h-[62px] w-auto lg:h-[76px]",
    },
    {
        name: "Kubernetes",
        src: "/images/icons/kubernetes_logo.svg",
        width: 82,
        height: 82,
        className: "h-[64px] w-auto lg:h-[80px]",
    },
    {
        name: "Java",
        src: "/images/icons/java-logo 1.svg",
        width: 82,
        height: 82,
        className: "h-[64px] w-auto lg:h-[80px]",
    },
];

export default function TechnologiesSection() {
    const marqueeItems = [...technologies, ...technologies];

    return (
        <section className="w-full flex flex-col items-center justify-start px-4 pt-16 pb-20 text-center lg:px-0 lg:pt-0 lg:pb-24 lg:-translate-y-30">
            <div className="mb-8 flex items-center gap-3 lg:mb-3">
                <div className="mb-5 flex items-center gap-5">
                    <BlueLargeRightArrow
                        size="h-[40px] w-[40px]"
                        iconSize="h-6 w-6"
                    />
                    <p className="inter-tight text-[#01030B]">Industries</p>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <h2
                    className="heading-2 !text-[#01030B] !text-center block w-full max-w-[980px]"
                >
                    We use advanced technologies to deliver smart,
                    <br />
                    scalable solutions for business growth.
                </h2>
            </div>

            <div
                className="mt-14 w-full overflow-hidden lg:mt-12"
                style={{
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
                }}
            >
                <div className="tech-marquee flex w-max items-center">
                    {marqueeItems.map((item, index) => (
                        <div
                            key={`${item.name}-${index}`}
                            className="flex h-[90px] w-[10px] shrink-0 items-center justify-center px-2 opacity-[1] grayscale lg:w-[130px] scale-[0.75]"
                        >
                            <Image
                                src={item.src}
                                alt={item.name}
                                width={item.width}
                                height={item.height}
                                className={item.className}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .tech-marquee {
                    animation: techMarquee 22s linear infinite;
                }

                @keyframes techMarquee {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </section>
    );
}