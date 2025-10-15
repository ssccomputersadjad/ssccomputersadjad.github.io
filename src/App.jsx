import React, { useState, useEffect } from "react";
import { Button, Steps, theme } from "antd";
import "./App.css";
import { useMediaQuery } from "react-responsive";
import sadjadLogo from "./assets/sadjad-logo.png";
import computerLogo from "./assets/f2.png";

const JoinSadjadChannel = ({ onLinkClick }) => {
  return (
    <div className="flex flex-col">
      <span>شما میتونید با کلیک بر روی لینک زیر عضو کانال دانشگاه شوید</span>
      <a
        style={{ color: "white" }}
        onClick={() => {
          onLinkClick();
          window.open("https://t.me/SadjadUniversity", "_blank", "noreferrer");
        }}
        href="https://t.me/SadjadUniversity"
        target="_blank"
        rel="noreferrer"
      >
        کانال دانشگاه سجاد
      </a>
    </div>
  );
};

const JoinComputerChannel = ({ onLinkClick }) => {
  return (
    <div className="flex flex-col">
      <span>
        شما میتونید با کلیک بر روی لینک زیر عضو کانال انجمن علمی کامپیوتر شوید
      </span>
      <a
        style={{ color: "white" }}
        onClick={() => {
          onLinkClick();
          window.open("https://t.me/SUTComputer", "_blank", "noreferrer");
        }}
        href="https://t.me/SUTComputer"
        target="_blank"
        rel="noreferrer"
      >
        کانال انجمن علمی کامپیوتر
      </a>
    </div>
  );
};

const GoogleForm = () => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  return (
    <iframe
      src="https://docs.google.com/forms/d/e/1FAIpQLSfYX3sC0xm0jSnhBVssBE6pWKY3MhQqdFhqvVO05MqdbIzprg/viewform?embedded=true"
      width={isTabletOrMobile ? "340" : "700"}
      height="3049"
      frameborder="0"
      marginheight="0"
      marginwidth="0"
    >
      Loading…
    </iframe>
  );
};

const Completion = () => {
  return (
    <div dir="rtl" style={{ textAlign: "center", padding: "20px" }}>
      <h1>تبریک!</h1>
      <p>شما تمامی مراحل را با موفقیت تکمیل کردید.</p>
      <p>
        از طرف انجمن علمی کامپیوتر دانشگاه سجاد قبولی شما در این رشته را تبریک
        می‌گوییم در دنیای جذاب بیت‌ها منتظرتیم
      </p>
    </div>
  );
};

const Gallery = () => {
  const imageModules = import.meta.glob("./assets/img/**/*.{jpg,jpeg,JPG}", {
    eager: true,
  });
  const images = Object.values(imageModules).map((module) => module.default);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: "16px",
        padding: "16px",
        height: "100%",
        overflow: "auto",
      }}
    >
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Gallery image ${index + 1}`}
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        />
      ))}
    </div>
  );
};

const App = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [galleryTimerDone, setGalleryTimerDone] = useState(false);
  const [sadjadClicked, setSadjadClicked] = useState(false);
  const [computerClicked, setComputerClicked] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const comp = localStorage.getItem("completed");
    if (comp === "true") {
      setCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (current === 2) {
      setGalleryTimerDone(false);
      const timer = setTimeout(() => setGalleryTimerDone(true), 15000);
      return () => clearTimeout(timer);
    } else {
      setGalleryTimerDone(true);
    }
  }, [current]);

  const steps = [
    {
      title: "عضویت در کانال دانشگاه",
      content: <JoinSadjadChannel onLinkClick={() => setSadjadClicked(true)} />,
    },
    {
      title: "عضویت در کانال انجمن علمی",
      content: (
        <JoinComputerChannel onLinkClick={() => setComputerClicked(true)} />
      ),
    },
    {
      title: "فعالیت های انجمن",
      content: <Gallery />,
    },
    {
      title: "پاسخ به پرسش نامه",
      content: <GoogleForm />,
    },
  ];
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const contentStyle = {
    height: "500px",
    textAlign: "center",
    color: "white",
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  return completed ? (
    <Completion />
  ) : (
    <div dir="rtl" className="Container">
      <div className="flex flex-row flex-center">
        <img
          src={sadjadLogo}
          alt="Sadjad University Logo"
          style={{ height: "100px" }}
        />
        <img
          src={computerLogo}
          alt="Computer Science Logo"
          style={{ height: "150px" }}
        />
      </div>
      <h1>به دانشگاه سجاد خوش آمدید</h1>
      <section className="Steps">
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <Button
              style={{ color: "white" }}
              type="primary"
              onClick={() => next()}
              disabled={
                (current === 0 && !sadjadClicked) ||
                (current === 1 && !computerClicked) ||
                (current === 2 && !galleryTimerDone)
              }
            >
              بعدی
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => {
                setCompleted(true);
                localStorage.setItem("completed", "true");
              }}
            >
              تمام
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
              قبلی
            </Button>
          )}
        </div>
      </section>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          fontSize: "12px",
          fontWeight: "bold",
          color: "white",
        }}
      >
        <h3>کپی رایت</h3>
        <a
          href="https://emadlashkari.me/"
          style={{ fontSize: "15px", color: "white" }}
        >
          عماد لشکری
        </a>
        <h3>انجمن علمی کامپیوتر دانشگاه سجاد</h3>
      </div>
    </div>
  );
};
export default App;
