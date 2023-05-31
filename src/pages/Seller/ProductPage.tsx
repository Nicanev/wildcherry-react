import {Link} from "react-router-dom";
import React from "react";

export function SellerProductPage() {
    return <>
        <div className="product-seller">
            <div className="product-seller__container">
                <h1>Ваши позиции</h1>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>ffsdf</td>
                        <td>sdfsdf</td>
                        <td>
                            <button>Изменить</button>
                            <button>Удалить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
}