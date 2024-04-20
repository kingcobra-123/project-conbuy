import react from "react";
import Svg, {Rect } from "react-native-svg";


const ProgressBar = ({ progress }) => {

    const barWidth = 230;
    const progressWidth =( progress/ 100) * barWidth;

    return (
        <Svg height="7" width={barWidth}>
            <Rect width={barWidth} height={"100%"} fill="#eee" rx={3.5} ry={3.5} />
            <Rect width={progressWidth} height={"100%"} fill="#F7A70B"  rx={3.5} ry={3.5} />
        </Svg>
    );

};

export default ProgressBar;

