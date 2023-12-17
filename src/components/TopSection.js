import moment from "moment"
import { useEffect, useState } from "react"

const TopSection = () => {
  const [currentTime, setCurrentTime] = useState(moment().format('MMMM Do, YYYY - h:mm:ss'))
  useEffect(() => {

    const timer = setInterval(() => {

      setCurrentTime(moment().format('MMMM Do, YYYY - h:mm:ss'));

    }, 1000);


    return () => {

      clearInterval(timer);

    };

  }, []);

  return <header className="top-wrapper">
    <div className="triangle-wrap">
      <p className="current-time">{currentTime}</p>
      <p className="title">{'< SPE / FRONTEND >'}</p>
    </div>
  </header>
}

export default TopSection