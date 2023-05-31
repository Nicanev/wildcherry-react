import {ReactComponent as Star} from "../../assets/icons/Star.svg";

interface RatingProps {
    score: any;
    count_score?: any;
}

export function Rating({score, count_score}: RatingProps) {
    const rate: any = score;
    const reviewsWord = getReviewsWord(count_score);

    return (
        <>
            <Star className={rate >= 1 ? "star-full" : ""}/>
            <Star className={rate >= 2 ? "star-full" : ""}/>
            <Star className={rate >= 3 ? "star-full" : ""}/>
            <Star className={rate >= 4 ? "star-full" : ""}/>
            <Star className={rate >= 5 ? "star-full" : ""}/>
            {count_score && (
                <span>
          {count_score} {reviewsWord}
        </span>
            )}
        </>
    );
}

function getReviewsWord(count: number): string {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        return "отзывов";
    }

    if (lastDigit === 1) {
        return "отзыв";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return "отзыва";
    }

    return "отзывов";
}

