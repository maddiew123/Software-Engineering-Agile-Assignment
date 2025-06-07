import dayjs from 'dayjs';
import MatchInput from './MatchInput';
import "./background.png"
import HeaderComponent from './HeaderComponent';

export default function createNewMatch() {

  return (
    <>
     <HeaderComponent admin={true} loggedIn={true} />
    <MatchInput inlocation="" indate={dayjs('2022-04-17')} inopponent={0} inhome={0} />
  </>
  );
}

