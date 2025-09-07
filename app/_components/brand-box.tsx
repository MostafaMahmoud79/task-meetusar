import Image from "next/image";

export default function BrandBox() {
  return (
    <div className="relative hidden lg:flex flex-col justify-center items-center flex-1 pr-[126px]">
      <div>
        <Image
          src={"/assets/brand.png"}
          width={696.32}
          height={288.16}
          priority
          alt="brand img"
        />
      </div>
      <div>
        <Image
          src={"/assets/logo_text.png"}
          width={413}
          height={75}
          priority
          alt="brand img"
          className=""
        />
      </div>
    </div>
  );
}
