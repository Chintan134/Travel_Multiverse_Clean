const HeroImage = ({ src }) => {
  const safeSrc = src || "/hero-placeholder.jpg";

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-3xl border border-beige shadow-soft">
        <img
          src={safeSrc}
          alt="Trip hero"
          className="w-full object-cover h-56 md:h-64 lg:h-72"
        />
      </div>
    </div>
  );
};

export default HeroImage;
