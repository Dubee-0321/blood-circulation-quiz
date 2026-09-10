const mainCard = document.querySelector(".main-card");
let selectedChar = "적혈구";

// 시작하기 버튼 클릭 시 캐릭터 선택 화면으로 전환
document.getElementById("quiz-btn")?.addEventListener("click", showCharacterSelect);

function showCharacterSelect() {
    mainCard.innerHTML = `
        <h1>캐릭터를 선택하세요!</h1>
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
        ? "안녕! 난 적혈구야. 헤모글로빈에 의해 산소를 운반하지" 
        : "반가워! 난 백혈구야. 세균이나 바이러스와 같은 외부 침입자로부터 몸을 보호하는 면역 기능을 담당하지.";

    mainCard.innerHTML = `
        ${iconSvg}
        <h2 style="color: #a4133c;">${name}, 준비 완료!</h2>
        <p style="color: #4a4a4a; font-size: 16px;">${introText}</p>
        <div style="background: #fff5f7; border-radius: 15px; padding: 15px; width: 100%;">
            <p style="color: #a4133c; font-weight: bold; margin-bottom: 5px;">게임 방법</p>
            <p style="color: #555; font-size: 14px; margin: 0; line-height: 1.4;">
                지금부터 심장을 출발해서 몸속 여러 기관들을 지나갈 거야.
                각 장소에서 나오는 퀴즈에 정답을 답해야 다음 목적지로 갈 수 있어. 
                만약 틀린 답을 고른다면, 심혈관계 질환 하나에 대한 정보가 나올거야. 
                질환 세개가 쌓인다면 게임 오버! 혈액 순환이 잘 진행될 수 있도록 도와줄래?<br>
                
            </p>
        </div>
        <button id="start-journey-btn">출발하기!</button>
    `;

    document.getElementById("start-journey-btn").addEventListener("click", startCirculationGame);
}

// 혈액 순환 게임 단계 데이터
const gameSteps = [
    {
        title: "폐 (산소 교환)",
        speech: "첫 번째 목적지는 [폐]야! 이산화탄소를 버리고 산소를 받으러 가자!",
        quiz: "폐에 도착했어! 폐포에서 혈액 속으로 들어오는 기체는 무엇일까?",
        options: ["산소", "이산화탄소", "질소"],
        answer: 0,
        explanation: "맞았어! 폐포에서는 혈액에 산소를 공급하고 이산화탄소를 받아내!"
    },
    {
        title: "심장 (좌심방·좌심실)",
        speech: "산소를 가득 채웠으니 다시 [심장]으로 돌아가자!",
        quiz: "산소가 풍부한 혈액(동맥혈)이 폐에서 처음 들어오는 곳은 어디일까?",
        options: ["우심방", "좌심방", "우심실"],
        answer: 1,
        explanation: "정답! 폐를 지난 깨끗한 피는 좌심방으로 돌아와 좌심실로 이동해!"
    },
    {
        title: "온몸 세포",
        speech: "이제 대동맥을 타고 [온몸 세포]로 가서 산소와 영양소를 전해주자!",
        quiz: "온몸의 모세혈관에서 세포에게 산소를 주고 받아오는 노폐물 기체는?",
        options: ["수소", "산소", "이산화탄소"],
        answer: 2,
        explanation: "좋아! 세포는 산소를 사용하고 결과물로 이산화탄소를 만들어내."
    },
    {
        title: "심장 (우심방 - 도착!)",
        speech: "이산화탄소를 품고 정맥을 따라 마지막 목적지인 [심장]으로 무사히 돌아왔어!",
        quiz: "온몸을 돌고 온 피가 심장으로 다시 들어가는 입구는 어디일까?",
        options: ["우심방", "좌심실", "폐동맥"],
        answer: 0,
        explanation: "완벽해! 우심방으로 돌아온 피는 다시 우심실을 통해 폐로 나아가게 돼!"
    }
];

let currentStep = 0;

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
                <!-- 폐 (상단) -->
                <rect x="110" y="10" width="80" height="35" rx="10" fill="${currentStep === 0 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="32" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">🫁 폐</text>

                <!-- 심장 (중앙) -->
                <rect x="110" y="72" width="80" height="36" rx="10" fill="${currentStep === 1 || currentStep === 3 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="95" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">❤️ 심장</text>

                <!-- 온몸 세포 (하단) -->
                <rect x="100" y="135" width="100" height="35" rx="10" fill="${currentStep === 2 ? '#ff4d6d' : '#ffe5ec'}" stroke="#a4133c" stroke-width="2"/>
                <text x="150" y="157" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">🦵 온몸 세포</text>

                <!-- 혈관 연결 경로 -->
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
            <p class="quiz-title">❓ ${step.quiz}</p>
            <div class="options-grid">
                ${step.options.map((opt, idx) => `
                    <button class="opt-btn" onclick="checkAnswer(${idx})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

// 정답 확인 함수
function checkAnswer(selected) {
    const step = gameSteps[currentStep];
    if (selected === step.answer) {
        alert("⭕ 정답입니다! " + step.explanation);
        currentStep++;
        if (currentStep < gameSteps.length) {
            renderGameLayout();
        } else {
            showCompletionScreen();
        }
    } else {
        alert("❌ 다시 한번 생각해보세요.");
    }
}

// 탐험 완료 화면
function showCompletionScreen() {
    mainCard.innerHTML = `
        <h1 style="color: #a4133c;">게임 클리어!</h1>
        <p style="font-size: 16px; color: #4a4a4a;">
            축하합니다! 심장, 폐, 온몸 세포를 무사히 돌며 산소와 이산화탄소 교환 원리를 완벽하게 배웠어요!
        </p>
        <button onclick="location.reload()">처음으로 돌아가기</button>
    `;
}
