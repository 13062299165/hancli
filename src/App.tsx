import React, { useState } from "react";
import styles from './app.module.less'
import Image from './assets/Snipaste_2022-04-17_22-49-00.jpg'
const App = () => {
    // issue:获得的类名为乱码
    let [inputValue, setInputValue] = useState<string>("")
    return <div className={styles.container}>
        <h2>hhh</h2>
        Hey,World
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <p>{inputValue}</p>
    </div>
}
export default App;