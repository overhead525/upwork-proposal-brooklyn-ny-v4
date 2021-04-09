import { motion, PanInfo, useAnimation } from "framer-motion";
import { StyledElementCard, StyledCardContent } from "./styledComponents";
import Typography from "@material-ui/core/Typography";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { updateDragPointerCoordinates } from "../../../features/formBuilder/editorDragAndDropSlice";

interface ElementCardProps {
  dropAreaRef: React.RefObject<any>;
  icon: JSX.Element;
  text: string;
}

export const ElementCard: React.FC<ElementCardProps> = ({
  dropAreaRef,
  icon,
  text,
}) => {
  const dispatch = useDispatch();

  const cardControls = useAnimation();

  return (
    <motion.div
      animate={cardControls}
      drag
      onDrag={(event, { point }) =>
        dispatch(updateDragPointerCoordinates({ x: point.x, y: point.y }))
      }
      dragConstraints={dropAreaRef}
      dragMomentum={false}
      onDragEnd={(event, info: PanInfo) => {
        dispatch(updateDragPointerCoordinates({ x: 0, y: 0 }));
        if (info.offset.x > 360) {
          cardControls.start({
            x: -info.delta.x,
            y: -info.delta.y,
            transition: { duration: 0 },
          });
          return;
        }
        cardControls.start({
          x: -info.delta.x,
          y: -info.delta.y,
          transition: { duration: 0.2 },
        });
      }}
      whileHover={{ scale: 1.1 }}
      whileDrag={{ scale: 0.9, opacity: 0.8 }}
    >
      <StyledElementCard>
        <StyledCardContent>
          {icon}
          <Typography style={{ paddingLeft: "1rem" }}>{text}</Typography>
        </StyledCardContent>
      </StyledElementCard>
    </motion.div>
  );
};
