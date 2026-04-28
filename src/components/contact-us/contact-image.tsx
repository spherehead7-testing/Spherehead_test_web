import React from "react";
import Image from "next/image";

export default function ContactImage() {
  return (
    <section className="w-full h-[40vh] lg:h-[60vh] relative snap-start bg-white">
      <Image 
        src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777366689/contactus_jpsnfk.png" 
        alt="Delaware Cityscape" 
        fill 
        className="object-cover" 
      />
    </section>
  );
}