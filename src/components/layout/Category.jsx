import { useState } from 'react';
import './Category.css';
import '@/assets/css/typography.css'; 

const Category = () => {
    const [activeItem, setActiveItem] = useState(null);

    const menuItems = [
        '전체상품',
        '신상&베스트',
        '다이어리',
        '스티커',
        '메모지',
        '마스킹 테이프',
        '키링',
        '고객센터'
    ];

    const handleClick = (item) => {
        setActiveItem(item);
    };

    return (
        <nav className="nav-container">
            <div className="nav-wrapper">
                <div className="nav-menu">
                    <div className="nav-items">
                        {menuItems.map((item) => (
                            <button
                                key={item}
                                className={`nav-item ${activeItem === item ? 'active' : ''}`}
                                onClick={() => handleClick(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Category;