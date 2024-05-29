import React from "react";
import styles from "./MainScren.module.css";


function MainScren(props) {
   return (
       <div className={styles.mainScren}>
           {props.children}
       </div>
   );
};

export default MainScren;