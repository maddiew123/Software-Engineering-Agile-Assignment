import dayjs from 'dayjs';
import MatchInput from './MatchInput';
import "./background.png"

export default function createNewMatch() {

  return (
    <MatchInput inlocation="" indate={dayjs('2022-04-17')} inopponent={0} inhome={0} />
  );
}

