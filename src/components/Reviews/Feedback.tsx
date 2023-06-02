import React, {useEffect, useState} from 'react';
import FeedbackForm from './FeedbackForm';
import FeedbackList from './FeedbackList';
import axios from "axios";
import config from "../../config";
import "./Feedback.scss"
import parseJwt from "../../jwtUtils";
import {useNavigate} from "react-router-dom";
import Pagination from "../Pagination/Pagination";

const Feedback: React.FC<{ productId: string }> = ({productId}) => {
    const [isReviewAdded, setIsReviewAdded] = useState(false);
    const [feedbackItems, setFeedbackItems] = useState<any>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    let navigate = useNavigate();

    useEffect(() => {
        fetchFeedbackItems();
    }, []);

    const fetchFeedbackItems = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/review`, {
                params: {
                    order: 'ASC',
                    page: currentPage,
                    take: 5,
                    product: productId,
                },
            });
            setFeedbackItems(response.data.reverse());
            const totalCount = parseInt(response.headers['x-total-count']);
            const itemsPerPage = 5;
            const totalPages = Math.ceil(totalCount / itemsPerPage);
            setTotalPages(totalPages);
        } catch (error) {
            console.error('Ошибка при получении отзывов:', error);
        }
    };
    const handleSubmit = async (title: string, description: string, score: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login')
        }
        const user = parseJwt(token)
        try {
            await axios.post(`${config.apiUrl}/review`, {
                title: title,
                description: description,
                score: Number(score),
                product: productId,
                user: user.id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setIsReviewAdded(true);
            fetchFeedbackItems()
        } catch (error) {
            console.log(error)
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        fetchFeedbackItems()
    };

    return (
        <div className="feedback">
            <h2>Отправить отзыв</h2>
            {isReviewAdded ? (
                <p>Отзыв успешно отправлен!</p>
            ) : (
                <FeedbackForm onSubmit={handleSubmit}/>
            )}

            {feedbackItems.length > 0 && (
                <>
                    <FeedbackList feedbackItems={feedbackItems}/>
                    <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange}/>
                </>
            )}
        </div>
    );
};

export default Feedback;

