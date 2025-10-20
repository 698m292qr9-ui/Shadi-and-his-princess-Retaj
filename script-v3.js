document.addEventListener('DOMContentLoaded', () => {
    // ===========================================
    // 1. وظائف التنقل بين الصفحات
    // ===========================================
    const appContainer = document.getElementById('app-container');
    const homePage = document.getElementById('home-page');
    const quizPage = document.getElementById('quiz-page');
    const loveLanguagesPage = document.getElementById('love-languages-page');
    const allPages = document.querySelectorAll('.page');

    function navigateTo(targetId) {
        allPages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        window.scrollTo(0, 0); // للعودة لأعلى الصفحة
    }

    // إعداد أزرار القائمة والتنقل
    document.querySelectorAll('.menu-button, .back-button').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute('data-target');
            navigateTo(targetId);

            // تهيئة محتوى الصفحة عند الانتقال إليها
            if (targetId === 'quiz-page') {
                loadQuizQuestion(1);
            } else if (targetId === 'love-languages-page') {
                initLoveLanguages();
            } else if (targetId === 'home-page') {
                // إعادة تهيئة الواجهة الرئيسية
                arGreeting.innerHTML = '';
                enGreeting.innerHTML = '';
                startTypingGreetings();
            }
        });
    });

    // ===========================================
    // 2. الترحيب المتحرك (الواجهة)
    // ===========================================
    const arGreeting = document.querySelector('.greeting-text');
    const enGreeting = document.querySelector('.greeting-text-en');

    const arMessage = "مرحبًا بكِ يا نجمتي الساطعة";
    const enMessage = "Welcome, My Bright Star";

    function typeText(element, message, delay, isEnglish = false) {
        return new Promise(resolve => {
            let i = 0;
            function typing() {
                if (i < message.length) {
                    element.innerHTML += message.charAt(i);
                    i++;
                    setTimeout(typing, delay);
                } else {
                    resolve();
                }
            }
            typing();
        });
    }

    async function startTypingGreetings() {
        await typeText(arGreeting, arMessage, 80); 
        await typeText(enGreeting, enMessage, 60, true);
    }

    // بدء الترحيب عند تحميل الصفحة لأول مرة
    startTypingGreetings();

    // ===========================================
    // 3. نظام الأسئلة (Quiz Logic)
    // ===========================================
    const quizContent = document.getElementById('quiz-content');
    const feedbackEmoji = document.getElementById('feedback-emoji');

    function showFeedback(emojiCode, message) {
        feedbackEmoji.style.display = 'block';
        feedbackEmoji.innerHTML = `<span style="position:relative;">${emojiCode}</span>`;

        // إظهار رسالة الخطأ
        const feedbackBox = document.createElement('div');
        feedbackBox.className = 'quiz-feedback';
        feedbackBox.innerHTML = message;
        quizContent.appendChild(feedbackBox);

        // إخفاء الإيموجي بعد انتهاء الحركة
        setTimeout(() => {
            feedbackEmoji.style.display = 'none';
        }, 1500);
    }

    const quizQuestions = [
        // السؤال 1
        {
            id: 1,
            question: "ما مقدار حُب شادي لأميرته ريتاج؟",
            options: [
                "كعدد النجوم في السماء",
                "كعدد قطرات المطر",
                "كحجم ماء البحر"
            ],
            correctAnswer: null, // لا يوجد إجابة صحيحة
            feedback: 'غلط! 😡🎀 لأن حُب شادي لأميرته ريتاج ليس له حدود!',
            nextAction: () => loadQuizQuestion(2)
        },
        // السؤال 2
        {
            id: 2,
            question: "ما هو الشيء الجميل في أميرة شادي ريتاج؟",
            options: [
                "عيونها",
                "ابتسامتها",
                "صوتها",
                "شعرها",
                "أسلوبها"
            ],
            correctAnswer: null,
            feedback: 'غلط! 🥺🎀 ليس هناك شيء وحيد جميل بريتاج، بل كل تفاصيلها ليس لها مثيل.',
            nextAction: () => loadQuizQuestion(3)
        },
        // السؤال 3 (إدخال نص)
        {
            id: 3,
            question: "ما مقدار حُبكِ لشادي؟",
            inputType: 'text',
            nextAction: (answer) => {
                // صفحة الشكر بعد الإجابة
                quizContent.innerHTML = `
                    <div class="quiz-feedback" style="background-color:#7CFC00; color:#0A0A2A;">
                        <h4 style="color:#0A0A2A;">شُكرًا لكِ يا أجمل أميرة! 💖</h4>
                        <p style="font-size: 1.2em;">" ${answer} "</p>
                        <p>أُحِبُكِ، أُحِبُكِ يا أميرتي الجميلة.</p>
                    </div>
                    <div class="quiz-next-question"><button onclick="navigateTo('home-page')">العودة للقائمة الرئيسية</button></div>
                `;
            }
        },
        // السؤال 4
        {
            id: 4,
            question: "ماذا أستحق منكِ؟",
            options: [
                "بوسة (فيديو)",
                "عشر كلمات أحبك (فيديو أو فويس)",
                "صورة جميلة لكِ وأنتِ مبتسمة",
                "جميع ما سبق"
            ],
            correctAnswer: "جميع ما سبق", // هنا جميع الخيارات صحيحة فنختار الأخير للتأكيد
            feedback: 'انتظرها منكِ بفارغ الصبر! أُحِبُكِ ❤️',
            nextAction: () => {
                quizContent.innerHTML = `
                    <div class="quiz-feedback" style="background-color:#FFD700; color:#0A0A2A;">
                        <h4 style="color:#0A0A2A;">رسالة خاصة:</h4>
                        <p style="font-size: 1.2em;">انتظرها منكِ بفارغ الصبر! أُحِبُكِ ❤️</p>
                    </div>
                    <div class="quiz-next-question"><button onclick="navigateTo('home-page')">العودة للقائمة الرئيسية</button></div>
                `;
            }
        }
    ];

    function loadQuizQuestion(qId) {
        const q = quizQuestions.find(qq => qq.id === qId);
        if (!q) return;

        quizContent.innerHTML = ''; // مسح المحتوى القديم

        const qBox = document.createElement('div');
        qBox.className = 'question-box';
        qBox.innerHTML = `<h4>السؤال ${qId}: ${q.question}</h4>`;

        if (q.inputType === 'text') {
            // السؤال الثالث (إدخال نص)
            qBox.innerHTML += `
                <input type="text" id="q3-input" placeholder="اكتبي إجابتكِ هنا بصدق..." dir="rtl">
                <button class="option-button" id="q3-submit-btn">إرسال الإجابة</button>
            `;
            quizContent.appendChild(qBox);

            document.getElementById('q3-submit-btn').onclick = () => {
                const answer = document.getElementById('q3-input').value;
                if (answer.trim()) {
                    q.nextAction(answer);
                }
            };

        } else if (q.id === 4) {
             // السؤال الرابع (كل الإجابات صحيحة)
             const optionsDiv = document.createElement('div');
             optionsDiv.className = 'quiz-options';
             q.options.forEach((optionText, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-button';
                btn.textContent = optionText;
                btn.onclick = () => {
                    // الانتقال لصفحة الشكر مباشرة عند الاختيار
                    showFeedback('✅', q.feedback);
                    setTimeout(q.nextAction, 1500);
                };
                optionsDiv.appendChild(btn);
             });
             qBox.appendChild(optionsDiv);
             quizContent.appendChild(qBox);

        } else {
            // السؤال الأول والثاني (الإجابات الخاطئة)
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'quiz-options';
            q.options.forEach((optionText, index) => {
                const btn = document.createElement('button');
                btn.className = 'option-button';
                btn.textContent = optionText;
                btn.onclick = () => {
                    // عرض الخطأ والإيموجي ثم الانتقال للسؤال التالي
                    showFeedback(q.id === 1 ? '😡' : '🥺', q.feedback);
                    
                    // إزالة صندوق الأسئلة وتجهيز الانتقال
                    qBox.style.display = 'none'; 
                    setTimeout(() => {
                        // تحميل السؤال التالي
                        q.nextAction();
                    }, 2000); 
                };
                optionsDiv.appendChild(btn);
            });
            qBox.appendChild(optionsDiv);
            quizContent.appendChild(qBox);
        }
    }


    // ===========================================
    // 4. نظام أحبك بكل اللغات
    // ===========================================
    const loveDisplay = document.getElementById('language-display');
    const loveLanguages = [
        "أُحِبُك (Arabic)", "I Love You (English)", "Te Amo (Spanish)", 
        "Je t'aime (French)", "Ich liebe dich (German)", "Ti amo (Italian)",
        "我爱你 (Wǒ ài nǐ) (Chinese)", "사랑해 (Saranghae) (Korean)", "愛してる (Aishiteru) (Japanese)"
    ];
    let langIndex = 0;

    function initLoveLanguages() {
        loveDisplay.textContent = 'اضغطي هنا...';
        langIndex = 0;
    }

    loveLanguagesPage.addEventListener('click', () => {
        if (langIndex < loveLanguages.length) {
            loveDisplay.textContent = loveLanguages[langIndex];
            loveDisplay.style.color = `hsl(${langIndex * 40}, 80%, 70%)`; // لون متغير
            langIndex++;
        } else {
            loveDisplay.textContent = 'أُحِبُكِ! (الجميع يجمع على ذلك)';
        }
    });
    
    // ===========================================
    // 5. تأثير النجوم في الخلفية (Stars Canvas)
    // ===========================================
    const starCanvas = document.getElementById('star-canvas');
    const starCtx = starCanvas.getContext('2d');
    starCanvas.width = window.innerWidth;
    starCanvas.height = window.innerHeight;

    let stars = [];
    const numStars = 150;

    function Star() {
        this.x = Math.random() * starCanvas.width;
        this.y = Math.random() * starCanvas.height;
        this.radius = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random(); 
        this.velocity = Math.random() * 0.05 + 0.01;
    }

    Star.prototype.draw = function() {
        starCtx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        starCtx.beginPath();
        starCtx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        starCtx.fill();
    };

    Star.prototype.update = function() {
        // تأثير وميض خفيف
        this.alpha += this.velocity;
        if (this.alpha > 1 || this.alpha < 0) {
            this.velocity = -this.velocity;
        }
    };

    function initStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star());
        }
    }

    function animateStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        starCtx.fillStyle = '#0A0A2A'; // إعادة رسم الخلفية السوداء (للتأكد)
        starCtx.fillRect(0, 0, starCanvas.width, starCanvas.height);
        
        for (let i = 0; i < stars.length; i++) {
            stars[i].update();
            stars[i].draw();
        }
        requestAnimationFrame(animateStars);
    }
    
    initStars();
    animateStars();

    window.addEventListener('resize', () => {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
    });

    // تحميل الصفحة الرئيسية عند البداية
    navigateTo('home-page');
});
