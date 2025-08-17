"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Gift, Ticket, HelpCircle } from "lucide-react"

export default function BirthdayWebsite() {
  const [showBalloons, setShowBalloons] = useState(false)
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [showCatMessage, setShowCatMessage] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showPlaylistPrize, setShowPlaylistPrize] = useState(false)

  const giftRef = useRef<HTMLDivElement>(null)
  const couponsRef = useRef<HTMLDivElement>(null)
  const quizRef = useRef<HTMLDivElement>(null)

  const quizData = {
    questions: [
      { id: "humor", question: "Your favorite thing about my personality", answer: "HUMOR" },
      { id: "golf", question: "Your favorite sport", answer: "GOLF" },
      { id: "reacher", question: "Your favorite show", answer: "REACHER" },
      { id: "game", question: "Something we do everyday", answer: "GAME" },
      { id: "red", question: "Your favorite color", answer: "RED" },
      { id: "fishing", question: "An activity you said you'd teach me", answer: "FISHING" },
      { id: "march", question: "When we started dating", answer: "MARCH" },
      { id: "eyes", question: "Your favorite thing about my face", answer: "EYES" },
    ],
  }

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    ref.current.style.setProperty("--mouse-x", `${x}%`)
    ref.current.style.setProperty("--mouse-y", `${y}%`)
  }

  const handleMouseLeave = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref.current) return
    ref.current.style.setProperty("--mouse-x", "50%")
    ref.current.style.setProperty("--mouse-y", "50%")
  }

  const handleCatClick = () => {
    setShowCatMessage(true)
  }

  const handleQuizAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...quizAnswers, [questionId]: value.toUpperCase() }
    setQuizAnswers(newAnswers)

    const isComplete = quizData.questions.every((q) => newAnswers[q.id] === q.answer)

    if (isComplete && !quizCompleted) {
      setQuizCompleted(true)
    }
  }

  const handleClaimPrize = () => {
    setActiveModal(null)
    setShowPlaylistPrize(true)
  }

  const downloadImage = (filename: string, imageUrl?: string) => {
    const link = document.createElement("a")
    if (imageUrl) {
      link.href = imageUrl
    } else {
      // Fallback for special gift images
      link.href = `/placeholder.svg?height=400&width=400&query=${filename}`
    }
    link.download = filename
    link.click()
  }

  const downloadAllCarImages = () => {
    const carImages = [
      { url: "/images/car-1.jpg", filename: "alex-car-1.jpg" },
      { url: "/images/car-2.jpg", filename: "alex-car-2.jpg" },
      { url: "/images/car-3.jpg", filename: "alex-car-3.jpg" },
    ]

    carImages.forEach((image, index) => {
      setTimeout(() => {
        downloadImage(image.filename, image.url)
      }, index * 500) // Stagger downloads by 500ms
    })
  }

  const ImageBalloon = ({ src, style }: { src: string; style: React.CSSProperties }) => (
    <div className="absolute animate-bounce" style={style}>
      <img src={src || "/placeholder.svg"} alt="Balloon" className="w-64 h-80 object-contain" />
    </div>
  )

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {/* Section 1 - Landing Page */}
      <section className="h-screen bg-[#f8efe1] flex items-center justify-center relative snap-start">
        <div className="flex items-center justify-center relative z-0">
          <img src="/images/happy-birthday-alex.jpg" alt="Happy Birthday Alex" className="max-w-5xl w-full h-auto" />
        </div>

        <ImageBalloon
          src="/images/balloon-orange.png"
          style={{ top: "5%", left: "2%", animationDelay: "0s", animationDuration: "3s", zIndex: 20 }}
        />
        <ImageBalloon
          src="/images/balloon-yellow.png"
          style={{ top: "8%", right: "3%", animationDelay: "0.5s", animationDuration: "3.5s", zIndex: 20 }}
        />
        <ImageBalloon
          src="/images/balloon-pink.png"
          style={{ top: "70%", left: "5%", animationDelay: "1s", animationDuration: "2.8s", zIndex: 20 }}
        />

        <ImageBalloon
          src="/images/balloon-yellow-2.png"
          style={{ top: "35%", left: "1%", animationDelay: "0.8s", animationDuration: "2.5s", zIndex: 20 }}
        />
        <ImageBalloon
          src="/images/balloon-pink.png"
          style={{ top: "35%", right: "1%", animationDelay: "1.2s", animationDuration: "3.3s", zIndex: 20 }}
        />
        <ImageBalloon
          src="/images/balloon-white.png"
          style={{ top: "70%", left: "80%", animationDelay: "1.8s", animationDuration: "2.9s", zIndex: 20 }}
        />
      </section>

      {/* Section 2 - Interactive Cat */}
      <section className="h-screen bg-gradient-radial from-[#f0664e] via-[#f0664e] to-[#d14d36] flex items-center justify-center relative snap-start">
        <div className="relative">
          <div className="cursor-pointer" onClick={handleCatClick}>
            <img
              src="/images/cat-alex.png"
              alt="Cat with letter for Alex"
              className="w-110 h-auto object-contain filter drop-shadow-2xl hover:scale-190 hover:animate-pulse cat-swivel transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Section 3 - Three Features */}
      <section className="h-screen flex snap-start">
        <div
          ref={giftRef}
          className="flex-1 bg-amber-500 flex flex-col items-center justify-center text-white foil-card foil-gift relative overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, giftRef)}
          onMouseLeave={() => handleMouseLeave(giftRef)}
        >
          <Gift size={80} className="mb-8 relative z-10" />
          <Button
            onClick={() => setActiveModal("gift")}
            className="bg-white text-black hover:bg-gray-200 relative z-10"
          >
            Open Special Gift
          </Button>
        </div>

        <div
          ref={couponsRef}
          className="flex-1 bg-orange-500 flex flex-col items-center justify-center text-white foil-card foil-coupons relative overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, couponsRef)}
          onMouseLeave={() => handleMouseLeave(couponsRef)}
        >
          <Ticket size={80} className="mb-8 relative z-10" />
          <Button
            onClick={() => setActiveModal("coupons")}
            className="bg-white text-black hover:bg-gray-200 relative z-10"
          >
            View Coupons
          </Button>
        </div>

        <div
          ref={quizRef}
          className="flex-1 bg-red-500 flex flex-col items-center justify-center text-white foil-card foil-crossword relative overflow-hidden"
          onMouseMove={(e) => handleMouseMove(e, quizRef)}
          onMouseLeave={() => handleMouseLeave(quizRef)}
        >
          <HelpCircle size={80} className="mb-8 relative z-10" />
          <Button
            onClick={() => setActiveModal("quiz")}
            className="bg-white text-black hover:bg-gray-200 relative z-10"
          >
            Take Quiz
          </Button>
        </div>
      </section>

      {/* Cat Message Modal */}
      {showCatMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-fade-in">
          <Card className="max-w-md w-full mx-4 p-6 modal-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-[#f0664e]">Happy Birthday Alex! 🎉</h2>
              <Button
                variant="outline"
                onClick={() => setShowCatMessage(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="text-center">
              <p className="text-lg mb-4 leading-relaxed">
                Happy birthday to my sweetest! 💕 I love you so much and hope you have an amazing day. 🎂
              </p>
              <p className="text-base text-gray-600 mb-4 leading-relaxed">
                May this be one of your best birthdays from many more to come! 🎈 There are some surprises waiting for
                you, I hope you love them as much as I loved making them.
              </p>
              <p className="text-lg text-[#f0664e] font-semibold">Mwaaahh! 💋✨</p>
            </div>
          </Card>
        </div>
      )}

      {/* Playlist Prize Modal */}
      {showPlaylistPrize && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-fade-in">
          <Card className="max-w-md w-full mx-4 p-6 playlist-prize-modal modal-slide-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-green-600">🎉 Quiz Complete! 🎉</h2>
              <Button
                variant="outline"
                onClick={() => setShowPlaylistPrize(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </Button>
            </div>
            <div className="text-center playlist-coupon-container">
              <img
                src="/images/coupon-playlist.png"
                alt="Custom Playlist Coupon"
                className="mx-auto mb-4 rounded-lg w-full h-auto object-contain playlist-coupon-image transition-all duration-300"
              />
              {/* Fixed playlist coupon download to use actual image URL */}
              <Button
                onClick={() => downloadImage("custom-playlist-coupon.png", "/images/coupon-playlist.png")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              >
                Claim
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Modals */}
      {activeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 modal-fade-in">
          <Card className="max-w-4xl w-[90vw] max-h-[90vh] mx-4 p-6 overflow-y-auto modal-slide-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {activeModal === "gift" && "Special Gift"}
                {activeModal === "coupons" && "Birthday Coupons"}
                {activeModal === "quiz" && "Birthday Quiz"}
              </h2>
              <Button
                variant="outline"
                onClick={() => setActiveModal(null)}
                className="text-xl font-bold w-10 h-10 p-0 hover:bg-red-100 hover:text-red-600 border-2"
              >
                ✕
              </Button>
            </div>

            {activeModal === "gift" && (
              <div className="text-center">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <img
                    src="/images/car-1.jpg"
                    alt="Alex Car Design 1"
                    className="w-full h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src="/images/car-2.jpg"
                    alt="Alex Car Design 2"
                    className="w-full h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                  <img
                    src="/images/car-3.jpg"
                    alt="Alex Car Design 3"
                    className="w-full h-auto object-contain rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Button
                  onClick={downloadAllCarImages}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 text-lg font-semibold"
                >
                  Download All Images
                </Button>
              </div>
            )}

            {activeModal === "coupons" && (
              <div className="grid grid-cols-2 gap-4 p-2">
                <div className="text-center coupon-container movie-night-coupon">
                  <img
                    src="/images/coupon-movie-night.png"
                    alt="Movie Night Coupon"
                    className="mx-auto mb-3 rounded-lg w-full h-auto object-contain coupon-image transition-all duration-300"
                  />
                  {/* Fixed download to use actual coupon image URL */}
                  <Button
                    size="sm"
                    onClick={() => downloadImage("movie-night-coupon.png", "/images/coupon-movie-night.png")}
                    className="coupon-download-btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-sm"
                  >
                    Claim
                  </Button>
                </div>
                <div className="text-center coupon-container game-coupon">
                  <img
                    src="/images/coupon-game.png"
                    alt="Game Coupon"
                    className="mx-auto mb-3 rounded-lg w-full h-auto object-contain coupon-image transition-all duration-300"
                  />
                  {/* Fixed download to use actual coupon image URL */}
                  <Button
                    size="sm"
                    onClick={() => downloadImage("game-coupon.png", "/images/coupon-game.png")}
                    className="coupon-download-btn bg-orange-600 hover:bg-orange-700 text-white px-4 py-1 text-sm"
                  >
                    Claim
                  </Button>
                </div>
                <div className="text-center coupon-container kiss-coupon">
                  <img
                    src="/images/coupon-whatever.png"
                    alt="Whatever You Want Coupon"
                    className="mx-auto mb-3 rounded-lg w-full h-auto object-contain coupon-image transition-all duration-300"
                  />
                  {/* Fixed download to use actual coupon image URL */}
                  <Button
                    size="sm"
                    onClick={() => downloadImage("whatever-coupon.png", "/images/coupon-whatever.png")}
                    className="coupon-download-btn bg-pink-600 hover:bg-pink-700 text-white px-4 py-1 text-sm"
                  >
                    Claim
                  </Button>
                </div>
                <div className="text-center coupon-container animal-coupon">
                  <img
                    src="/images/coupon-free-admission.png"
                    alt="Free Admission Coupon"
                    className="mx-auto mb-3 rounded-lg w-full h-auto object-contain coupon-image transition-all duration-300"
                  />
                  {/* Fixed download to use actual coupon image URL */}
                  <Button
                    size="sm"
                    onClick={() => downloadImage("free-admission-coupon.png", "/images/coupon-free-admission.png")}
                    className="coupon-download-btn bg-green-600 hover:bg-green-700 text-white px-4 py-1 text-sm"
                  >
                    Claim
                  </Button>
                </div>
              </div>
            )}

            {activeModal === "quiz" && (
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-6 text-pink-600">Birthday Quiz</h3>

                <div className="max-w-2xl mx-auto space-y-6">
                  {quizData.questions.map((q, index) => (
                    <div key={q.id} className="text-left bg-gray-50 p-4 rounded-lg">
                      <label className="block text-lg font-semibold mb-2 text-gray-800">
                        {index + 1}. {q.question}
                      </label>
                      <input
                        type="text"
                        value={quizAnswers[q.id] || ""}
                        onChange={(e) => handleQuizAnswer(q.id, e.target.value)}
                        className="w-full p-3 border-2 border-gray-300 rounded-lg text-lg font-medium uppercase tracking-wide focus:border-pink-500 focus:outline-none"
                        placeholder="Your answer..."
                      />
                      {quizAnswers[q.id] === q.answer && (
                        <div className="mt-2 text-green-600 font-semibold">✓ Correct!</div>
                      )}
                    </div>
                  ))}
                </div>

                {quizCompleted && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
                    <div className="text-green-600 font-bold mb-4 text-xl">
                      🎉 Congratulations! You completed the quiz! 🎉
                    </div>
                    <Button
                      onClick={handleClaimPrize}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 text-lg font-semibold"
                    >
                      🎁 Claim Your Prize
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      )}

      <style jsx>{`
        .cat-swivel:hover {
          animation: swivel 0.6s ease-in-out infinite alternate;
        }

        @keyframes swivel {
          0% { transform: rotate(-2deg) scale(1.1); }
          100% { transform: rotate(2deg) scale(1.1); }
        }

        .modal-fade-in {
          animation: modalFadeIn 0.3s ease-out;
        }

        .modal-slide-in {
          animation: modalSlideIn 0.4s ease-out;
        }

        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .bg-gradient-radial {
          background: radial-gradient(circle at center, #f0664e 0%, #f0664e 40%, #d14d36 100%);
        }

        .foil-card {
          --mouse-x: 50%;
          --mouse-y: 50%;
          transition: all 0.3s ease;
        }

        .foil-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x) var(--mouse-y),
            rgba(255, 255, 255, 0.4),
            rgba(255, 255, 255, 0.1),
            transparent 40%
          );
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 1;
        }

        .foil-card::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: conic-gradient(
            from 0deg at var(--mouse-x) var(--mouse-y),
            transparent,
            #ff00ff 20%,
            #00ffff 40%,
            #ffff00 60%,
            #ff00ff 80%,
            transparent
          );
          opacity: 0;
          mix-blend-mode: color-dodge;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 2;
        }

        .foil-card:hover::before {
          opacity: 1;
        }

        .foil-card:hover::after {
          opacity: 0.6;
        }

        .foil-card:hover {
          transform: scale(1.02);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .foil-gift::after {
          background: conic-gradient(
            from 0deg at var(--mouse-x) var(--mouse-y),
            transparent,
            #ffd700 20%,
            #ff6b35 40%,
            #f7931e 60%,
            #ffd700 80%,
            transparent
          );
        }

        .foil-coupons::after {
          background: conic-gradient(
            from 0deg at var(--mouse-x) var(--mouse-y),
            transparent,
            #ff4757 20%,
            #ff6348 40%,
            #ff7675 60%,
            #ff4757 80%,
            transparent
          );
        }

        .foil-crossword::after {
          background: conic-gradient(
            from 0deg at var(--mouse-x) var(--mouse-y),
            transparent,
            #e17055 20%,
            #d63031 40%,
            #74b9ff 60%,
            #e17055 80%,
            transparent
          );
        }

        .coupon-container {
          position: relative;
          overflow: visible;
        }

        .coupon-image:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .coupon-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }

        .movie-night-coupon:hover::before {
          content: '⭐';
          position: absolute;
          font-size: 2rem;
          color: #ffd700;
          animation: starBurst 1s ease-out infinite;
          top: 8%;
          left: 8%;
          z-index: 10;
        }

        .movie-night-coupon:hover::after {
          content: '✨';
          position: absolute;
          font-size: 1.5rem;
          color: #ffd700;
          animation: starBurst 1s ease-out infinite 0.3s;
          top: 12%;
          right: 10%;
          z-index: 10;
        }

        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }

        .game-coupon:hover::before {
          content: '!';
          position: absolute;
          font-size: 2rem;
          font-weight: bold;
          color: #ff6b35;
          background: #fff;
          border: 2px solid #ff6b35;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: exclamationPop 0.8s ease-out infinite;
          top: 8%;
          right: 8%;
          z-index: 10;
        }

        .game-coupon:hover::after {
          content: '!!';
          position: absolute;
          font-size: 1.5rem;
          font-weight: bold;
          color: #f7931e;
          animation: exclamationPop 0.8s ease-out infinite 0.4s;
          bottom: 30%;
          left: 8%;
          z-index: 10;
        }

        @keyframes exclamationPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(0); opacity: 0; }
        }

        .kiss-coupon:hover::before {
          content: '💋';
          position: absolute;
          font-size: 2rem;
          animation: heartFloat 1.2s ease-in-out infinite;
          top: 8%;
          left: 10%;
          z-index: 10;
        }

        .kiss-coupon:hover::after {
          content: '💕';
          position: absolute;
          font-size: 1.5rem;
          animation: heartFloat 1.2s ease-in-out infinite 0.6s;
          top: 12%;
          right: 8%;
          z-index: 10;
        }

        @keyframes heartFloat {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-40px) scale(0); opacity: 0; }
        }

        .animal-coupon:hover::before {
          content: 'POW!';
          position: absolute;
          font-size: 1.2rem;
          font-weight: bold;
          color: #fff;
          background: #ff4757;
          border: 2px solid #fff;
          border-radius: 50%;
          padding: 6px 10px;
          animation: comicPop 1s ease-out infinite;
          top: 8%;
          right: 10%;
          z-index: 10;
          transform-origin: center;
        }

        .animal-coupon:hover::after {
          content: 'BAM!';
          position: absolute;
          font-size: 1rem;
          font-weight: bold;
          color: #fff;
          background: #2d3436;
          border: 2px solid #fff;
          border-radius: 50%;
          padding: 4px 8px;
          animation: comicPop 1s ease-out infinite 0.5s;
          bottom: 35%;
          left: 6%;
          z-index: 10;
          transform-origin: center;
        }

        @keyframes comicPop {
          0% { transform: scale(0) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(5deg); opacity: 1; }
          100% { transform: scale(0) rotate(10deg); opacity: 0; }
        }

        .playlist-coupon-container {
          position: relative;
          overflow: visible;
        }

        .playlist-coupon-image:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }

        .playlist-coupon-container:hover::before {
          content: '♪';
          position: absolute;
          font-size: 2rem;
          color: #10b981;
          animation: musicFloat 1.5s ease-in-out infinite;
          top: 10%;
          left: 10%;
          z-index: 10;
        }

        .playlist-coupon-container:hover::after {
          content: '♫';
          position: absolute;
          font-size: 1.8rem;
          color: #059669;
          animation: musicFloat 1.5s ease-in-out infinite 0.5s;
          top: 15%;
          right: 10%;
          z-index: 10;
        }

        @keyframes musicFloat {
          0% { transform: translateY(0) scale(0); opacity: 0; }
          50% { transform: translateY(-15px) scale(1.2); opacity: 1; }
          100% { transform: translateY(-30px) scale(0); opacity: 0; }
        }

        .playlist-prize-modal {
          animation: prizeAppear 0.6s ease-out;
        }

        @keyframes prizeAppear {
          0% { transform: scale(0.5) rotate(-10deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(5deg); opacity: 0.8; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
