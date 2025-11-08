// Основные функции для сайта ломбарда

// ===== ФУНКЦИИ ДЛЯ ГЛАВНОЙ СТРАНИЦЫ (главная-страница.html) =====

// Калькулятор займа
function calculateLoan() {
    const amount = document.getElementById('amount').value;
    const term = document.getElementById('term').value;
    
    if (!amount || !term) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    // Простой расчет: сумма * срок * процентная ставка
    const interestRate = 0.15; // 15% годовых
    const monthlyRate = interestRate / 12;
    const totalAmount = parseFloat(amount) + (parseFloat(amount) * monthlyRate * parseInt(term));
    const monthlyPayment = totalAmount / parseInt(term);
    
    alert(`Результат расчета:\n\nСумма займа: ${amount} руб.\nСрок: ${term} мес.\nОбщая сумма к возврату: ${totalAmount.toFixed(2)} руб.\nЕжемесячный платеж: ${monthlyPayment.toFixed(2)} руб.`);
}

// Инициализация калькулятора на главной странице
function initCalculator() {
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateLoan);
    }
}

// ===== ФУНКЦИИ ДЛЯ АВТОРИЗАЦИИ (авториз.html) =====

// Переключение между вкладками авторизации и регистрации
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Убираем активный класс у всех вкладок и форм
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Добавляем активный класс текущей вкладке
            this.classList.add('active');
            
            // Показываем соответствующую форму
            const tabText = this.textContent.trim();
            if (tabText === 'Авторизация') {
                document.querySelector('.auth-form:nth-child(3)').classList.add('active');
            } else if (tabText === 'Регистрация') {
                document.querySelector('.auth-form:nth-child(4)').classList.add('active');
            }
        });
    });
}

// Маска для телефона
function initPhoneMask() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = value.match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
                e.target.value = !value[2] ? value[1] : 
                               '(' + value[1] + ') ' + value[2] + 
                               (value[3] ? '-' + value[3] : '') + 
                               (value[4] ? '-' + value[4] : '');
            }
        });
    });
}

// Отправка формы авторизации
function handleLogin() {
    const phoneInput = document.querySelector('#login-form input[type="tel"]');
    const phone = phoneInput ? phoneInput.value : '';
    
    if (!phone || phone.replace(/\D/g, '').length < 10) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Имитация отправки кода
    alert(`Код авторизации отправлен на номер: ${phone}\n\n(В демо-версии код: 123456)`);
    
    // Перенаправление на страницу ввода кода (можно добавить позже)
    // window.location.href = 'verify.html';
}

// Отправка формы регистрации
function handleRegistration() {
    const phone = document.querySelector('#register-form input[type="tel"]').value;
    const email = document.querySelector('#register-form input[type="email"]').value;
    const name = document.querySelector('#register-form input[type="text"]').value;
    
    if (!phone || !email || !name) {
        alert('Пожалуйста, заполните все поля');
        return;
    }
    
    if (phone.replace(/\D/g, '').length < 10) {
        alert('Пожалуйста, введите корректный номер телефона');
        return;
    }
    
    // Имитация регистрации
    alert(`Регистрация успешна!\n\nИмя: ${name}\nТелефон: ${phone}\nEmail: ${email}\n\nНа ваш телефон отправлен код подтверждения.`);
    
    // Перенаправление в личный кабинет
    setTimeout(() => {
        window.location.href = 'Account.html';
    }, 2000);
}

// Инициализация форм авторизации
function initAuthForms() {
    const loginBtn = document.querySelector('#login-form .submit-btn');
    const registerBtn = document.querySelector('#register-form .submit-btn');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', handleRegistration);
    }
}

// ===== ФУНКЦИИ ДЛЯ ЛИЧНОГО КАБИНЕТА (лк.html) =====

// Выход из личного кабинета
function handleLogout() {
    if (confirm('Вы уверены, что хотите выйти?')) {
        alert('Вы вышли из личного кабинета');
        window.location.href = 'авториз.html';
    }
}

// Инициализация личного кабинета
function initPersonalCabinet() {
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Добавляем обработчики для меню
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceName = this.textContent;
            alert(`Раздел "${serviceName}" находится в разработке`);
        });
    });
    
    // Добавляем обработчики для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const serviceName = this.querySelector('h3').textContent;
            alert(`Услуга "${serviceName}" будет доступна в ближайшее время`);
        });
    });
}

// ===== ФУНКЦИИ ДЛЯ ЧАТА (Feedback.html) =====

// Инициализация чата с оператором
function initChat() {
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const questionButtons = document.querySelectorAll('.question-btn');
    
    if (!chatMessages) return;
    
    // Функция добавления сообщения в чат
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'operator-message'}`;
        
        const time = new Date();
        const timeString = `${time.getHours()}:${time.getMinutes().toString().padStart(2, '0')}`;
        
        messageDiv.innerHTML = `
            ${text}
            <div class="message-time">${timeString}</div>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Если это сообщение от пользователя, имитируем ответ оператора
        if (isUser) {
            setTimeout(() => {
                const responses = [
                    "Спасибо за ваш вопрос. Давайте я помогу вам с этим.",
                    "Понятно. Давайте разберем этот вопрос подробнее.",
                    "Хороший вопрос! Давайте я расскажу вам об этом.",
                    "Спасибо за обращение. Я помогу вам разобраться.",
                    "Отличный вопрос! Давайте я объясню вам все детали."
                ];
                
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, false);
                
                // Добавляем информативный ответ через некоторое время
                setTimeout(() => {
                    const infoResponses = {
                        "Какие документы нужны для получения займа?": "Для получения займа необходим только паспорт гражданина РФ. Никаких дополнительных справок не требуется.",
                        "Какой максимальный размер займа?": "Максимальная сумма займа зависит от оценочной стоимости вашего залога. Обычно мы выдаем до 80% от стоимости предмета залога.",
                        "Какие проценты по займу?": "Наши процентные ставки начинаются от 4% в месяц для новых клиентов. Точная ставка зависит от суммы и срока займа.",
                        "Как продлить займ?": "Вы можете продлить займ, оплатив проценты за следующий период. Это можно сделать онлайн или в любом нашем отделении."
                    };
                    
                    if (infoResponses[text]) {
                        addMessage(infoResponses[text], false);
                    } else {
                        addMessage("По вашему вопросу я рекомендую обратиться в ближайшее отделение нашего ломбарда. Наши специалисты смогут дать вам более точную консультацию с учетом вашей конкретной ситуации.", false);
                    }
                }, 1500);
            }, 1000);
        }
    }
    
    // Отправка сообщения при нажатии кнопки
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const message = messageInput.value.trim();
            if (message) {
                addMessage(message, true);
                messageInput.value = '';
            }
        });
    }
    
    // Отправка сообщения при нажатии Enter
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }
    
    // Обработка кнопок с быстрыми вопросами
    questionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            addMessage(question, true);
        });
    });
}

// ===== ОБЩИЕ ФУНКЦИИ =====

// Проверка авторизации при загрузке страницы
function checkAuth() {
    // Здесь можно добавить проверку авторизации через localStorage или cookies
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    
    if (window.location.pathname.includes('лк.html') && !isAuthenticated) {
        // window.location.href = 'авториз.html';
    }
}

// Инициализация всех функций при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем на какой странице находимся и инициализируем соответствующие функции
    if (document.querySelector('.calculator')) {
        initCalculator();
    }
    
    if (document.querySelector('.auth-container')) {
        initAuthTabs();
        initPhoneMask();
        initAuthForms();
    }
    
    if (document.querySelector('.sidebar')) {
        initPersonalCabinet();
    }
    
    if (document.getElementById('chatMessages')) {
        initChat();
    }
    
    checkAuth();
});

// Простые утилиты
const utils = {
    // Форматирование телефона
    formatPhone: (phone) => {
        return phone.replace(/\D/g, '').replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    },
    
    // Проверка email
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },
    
    // Сохранение в localStorage
    saveToStorage: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
            return false;
        }
    },
    
    // Загрузка из localStorage
    loadFromStorage: (key) => {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Ошибка загрузки из localStorage:', e);
            return null;
        }
    }
    
};

// Слайдер для галереи изображений
function initSliders() {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(container => {
        const slider = container.querySelector('.slider');
        const slides = container.querySelectorAll('.slide');
        const prevBtn = container.querySelector('.slider-prev');
        const nextBtn = container.querySelector('.slider-next');
        const dotsContainer = container.querySelector('.slider-dots');
        
        let currentSlide = 0;
        
        // Создаем точки для навигации
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = container.querySelectorAll('.slider-dot');
        
        function goToSlide(index) {
            // Скрываем текущий слайд
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            // Показываем новый слайд
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
        
        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            goToSlide(next);
        }
        
        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            goToSlide(prev);
        }
        
        // Добавляем обработчики событий
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        
        // Автопрокрутка (опционально)
        let autoSlideInterval = setInterval(nextSlide, 5000);
        
        // Останавливаем автопрокрутку при наведении
        container.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        container.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(nextSlide, 5000);
        });
        
        // Добавляем обработчики для клавиатуры
        container.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'ArrowRight') nextSlide();
        });
    });
}

// Инициализация слайдеров при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initSliders();
});