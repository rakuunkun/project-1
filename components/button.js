import Link from "next/link";

const Button = ({ url, name }) => {
  return (
    <Link href={url}>
      <a>{name}</a>
    </Link>
  );
};

export default Button;
