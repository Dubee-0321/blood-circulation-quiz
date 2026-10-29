const mainCard = document.querySelector(".main-card");
let selectedChar = "적혈구";

// 시작하기 버튼 클릭 시 캐릭터 선택 화면으로 전환
document.getElementById("quiz-btn")?.addEventListener("click", showCharacterSelect);

function showCharacterSelect() {
    mainCard.innerHTML = `
        <h1>캐릭터를 선택하세요</h1>
        <div class="char-container">
            <div class="char-box" onclick="selectCharacter('적혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="45" fill="#ff4d6d"/>
                    <circle cx="50" cy="50" r="22" fill="#c9184a"/>
                </svg>
                <h3>적혈구</h3>
                <p></p>
            </div>
            <div class="char-box" onclick="selectCharacter('백혈구')">
                <svg viewBox="0 0 100 100" class="char-icon">
                    <circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#b8c0ff" stroke-width="4"/>
                    <circle cx="38" cy="45" r="12" fill="#7209b7"/>
                    <circle cx="58" cy="55" r="10" fill="#7209b7"/>
                </svg>
                <h3>백혈구</h3>
                <p></p>
            </div>
        </div>
    `;
}

// 캐릭터 선택 시 소개 화면
function selectCharacter(name) {
    selectedChar = name;
    let iconSvg = name === '적혈구' 
        ? `<svg viewBox="0 0 100 100" class="char-icon" style="width: 70px; height: 70px;"><circle cx="50" cy="50" r="45" fill="#ff4d6d"/><circle cx="50" cy="50" r="22" fill="#c9184a"/></svg>`
        : `<svg viewBox="0 0 100 100" class="char-icon" style="width: 70px; height: 70px;"><circle cx="50" cy="50" r="44" fill="#ffffff" stroke="#b8c0ff" stroke-width="4"/><circle cx="38" cy="45" r="12" fill="#7209b7"/><circle cx="58" cy="55" r="10" fill="#7209b7"/></svg>`;
    
    let introText = name === '적혈구' 
        ? "헤모글로빈에 의해 산소를 운반하는 적혈구" 
        : "세균이나 바이러스 등으로부터 몸을 보호하는 백혈구.";

    mainCard.innerHTML = `
        ${iconSvg}
        <h2 style="color: #a4133c;">${name}</h2>
        <p style="color: #4a4a4a; font-size: 16px;">${introText}</p>
        <div style="background: #fff5f7; border-radius: 15px; padding: 15px; width: 100%;">
            <p style="color: #a4133c; font-weight: bold; margin-bottom: 5px;">게임 방법</p>
            <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.4;">
                지금부터 심장을 출발해서 몸속 여러 기관들을 지나갈 것입니다.
                각 장소에서 나오는 퀴즈에 정답을 답해야 다음 목적지로 갈 수 있으며, 
                만약 틀린 답을 고른다면 심혈관계 질환 하나에 대한 정보가 나오게 됩니다.
                질환 세개가 쌓인다면 게임 오버<br>
                
            </p>
        </div>
        <button id="start-journey-btn">시작하기</button>
    `;

    document.getElementById("start-journey-btn").addEventListener("click", startCirculationGame);
}

// 혈액 순환 게임 단계 데이터
const gameSteps = [
    {
        title: "폐",
        speech: "첫 번째 목적지는 [폐]입니다. 이산화탄소를 버리고 산소를 받으러 갑시다",
        quiz: "폐포와 모세혈관 사이에서 산소와 이산화탄소가 교환되는 핵심 원리로 옳은 것은?",
        options: ["능동수송", "확산 현상", "삼투 현상"],
        answer: 1,
        explanation: "정답입니다"
    },
    {
        title: "심장",
        speech: "산소를 가득 채웠으니 다시 [심장]으로 돌아갑시다",
        quiz: "우리 몸의 혈관 중 [산소 함량이 가장 높은 혈액이 흐르는 혈관]과 [이산화탄소 함량이 가장 높은 혈액이 흐르는 혈관]을 순서대로 바르게 짝지은 것은?",
        options: ["대동맥 - 대정맥", "폐동맥 - 폐정맥", "폐정맥 - 폐동맥"],
        answer: 2,
        explanation: "정답입니다"
    },
    {
        title: "온몸 세포",
        speech: "이제 대동맥을 타고 온몸 세포로 가서 산소와 영양소를 전해줍시다",
        quiz: "좌심실이 강하게 수축할 때, 혈액이 심방으로 역류하지 않도록 '닫히는' 판막은?",
        options: ["이첨판(방실판막)", "반월판막", "정맥판막"],
        answer: 0,
        explanation: "정답입니다"
    },
    {
        title: "심장",
        speech: "마지막 목적지, 심장입니다",
        quiz: "모세혈관이 세포와 물질 교환을 효율적으로 할 수 있는 이유는 혈류 속도가 어떠하기 때문일까?",
        options: ["가장 느림", "가장 빠름", "동맥과 같음"],
        answer: 0,
        explanation: "정답입니다"
    }
];


          let currentStep = 0;
let wrongCount = 0; // 오답 횟수 (질환 걸린 횟수)

// 심혈관계 질환 정보 리스트 (오답 시 순서대로 획득)
const diseases = [
    "⚠️ [고혈압] 혈관 벽에 가해지는 압력이 지속적으로 너무 높은 상태입니다. 심장과 혈관에 큰 부담을 줍니다.",
    "⚠️ [동맥경화] 혈관 벽에 콜레스테롤 같은 노폐물이 쌓여 혈관이 좁아지고 탄력을 잃는 질환입니다.",
    "⚠️ [심근경색] 심장 근육에 산소를 공급하는 관상동맥이 막혀 심장 근육이 괴사하는 질환입니다"
];

// 메인 혈액 순환 게임 시작
function startCirculationGame() {
    mainCard.style.maxWidth = "520px";
    renderGameLayout();
}

function renderGameLayout() {
    const step = gameSteps[currentStep];

    mainCard.innerHTML = `
        <!-- 캐릭터 대사창 -->
        <div class="speech-bubble">
            <strong>${selectedChar}:</strong> "${step.speech}"
        </div>

        <!-- 순환계 지도 시각화 -->
        <div class="map-box">
            <svg viewBox="0 0 300 180" class="map-svg">
                <rect x="110" y="10" width="80" height="35" rx="10" fill="${currentStep === 0 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="32" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">🫁 폐</text>

                <rect x="110" y="72" width="80" height="36" rx="10" fill="${currentStep === 1 || currentStep === 3 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">❤️ 심장</text>

                <rect x="100" y="135" width="100" height="35" rx="10" fill="${currentStep === 2 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="157" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">🦵 온몸 세포</text>

                <path d="M 130 72 L 130 45" stroke="#ff4d6d" stroke-width="4" fill="none" stroke-dasharray="4"/>
                <path d="M 170 45 L 170 72" stroke="#4ea8de" stroke-width="4" fill="none" stroke-dasharray="4"/>
                <path d="M 170 108 L 170 135" stroke="#ff4d6d" stroke-width="4" fill="none" stroke-dasharray="4"/>
                <path d="M 130 135 L 130 108" stroke="#4ea8de" stroke-width="4" fill="none" stroke-dasharray="4"/>

                <!-- 이동하는 혈액 방울 -->
                <circle class="blood-drop step-${currentStep}" cx="150" cy="90" r="7" fill="#e63946" />
            </svg>
        </div>

        <!-- 퀴즈 영역 -->
        <div class="quiz-box">
            <p style="color: #c9184a; font-weight: bold; margin-bottom: 5px; font-size: 13px;">
                 현재 질환 경고: ${wrongCount} / 3
            </p>
            <p class="quiz-title">❓ ${step.quiz}</p>
            <div class="options-grid">
                ${step.options.map((opt, idx) => `
                    <button class="opt-btn" onclick="checkAnswer(${idx})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

// 정답 및 오답(질환 획득) 처리
function checkAnswer(selected) {
    const step = gameSteps[currentStep];
    
    // 정답일 때
    if (selected === step.answer) {
        alert(" \n" + step.explanation);
        currentStep++;
        if (currentStep < gameSteps.length) {
            renderGameLayout();
        } else {
            showCompletionScreen();
        }
    } 
    // 오답일 때 (질환 획득)
    else {
        let diseaseInfo = diseases[wrongCount];
        wrongCount++; // 오답 카운트 1 증가

        if (wrongCount >= 3) {
            // 3번 틀리면 게임 오버 화면으로 이동
            alert("오답입니다\n\n" + diseaseInfo + "\n\n질환이 누적되었습니다");
            showGameOverScreen();
        } else {
            // 아직 기회가 남았을 때
            alert("오답입니다\n\n" + diseaseInfo + "\n\n(현재 누적 질환: " + wrongCount + "개. 3개가 되면 게임 오버됩니다) 다시 생각해보세요");
            renderGameLayout(); // 화면을 다시 그려서 경고 카운트 업데이트
        }
    }
}

// 탐험 완료 화면 (클리어)
function showCompletionScreen() {
    mainCard.innerHTML = `
        <h1 style="color: #a4133c;">게임 클리어</h1>
        <p style="font-size: 16px; color: #4a4a4a;">
            축하합니다! 혈액 순환 원리를 완벽하게 배웠습니다!
        </p>
        <button onclick="location.reload()">처음으로 돌아가기</button>
    `;
}

// 게임 오버 화면 (3번 오답)
function showGameOverScreen() {
    mainCard.innerHTML = `
        <h1 style="color: #000000;">게임 오버</h1>
        <p style="font-size: 16px; color: #4a4a4a;">
            오답으로 인해 심혈관계 질환이 3개 발병하여, 게임을 더 이상 진행할 수 없습니다.
        </p>
        <div style="background: #fff0f3; padding: 15px; border-radius: 10px; text-align: left; margin: 15px 0;">
            <p style="margin: 0 0 10px 0; color: #a4133c; font-weight: bold;">[발병한 질환 목록]</p>
            <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #555; line-height: 1.6;">
                <li>고혈압</li>
                <li>동맥경화</li>
                <li>심근경색</li>
            </ul>
        </div>
        <button onclick="location.reload()" style="background: #333;">처음부터 다시 도전하기</button>
    `;
}
