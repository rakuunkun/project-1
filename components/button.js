import Link from "next/link";

const ButtonDir = ({ url, name }) => {
  return (
    <Link href={url}>
      <a>{name}</a>
    </Link>
  );
};

export default ButtonDir;
