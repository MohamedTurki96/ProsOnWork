type RatingDisplayProps = {
  rating: number;
  onClick?: (rating: number) => any;
};

export function RatingDisplay({ rating = 0, onClick }: RatingDisplayProps) {
  return (
    <div className="rating">
      {Array(5).fill(0).map((_, index) => {
        return (
          <i
            className={`ti ti-star${index < rating ? '-filled' : ''} text-warning`}
            key={index}
            onClick={() => onClick?.(index + 1)}
          />
        );
      })}
    </div>
  );
}
