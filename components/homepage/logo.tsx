import Image from "next/image";

export default function Logo() {
  return (
    <Image src='/logo.svg' height={100} width={100} alt="Logo" />
  );
}
