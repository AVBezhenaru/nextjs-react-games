import Image from 'next/image';

import holder from '../../Img/holder.png';

import ph from './Avatar.module.scss';

export default function Avatar() {
  return (
    <div className={ph.photo}>
      <Image
        style={{
          borderRadius: '50%',
        }}
        src={holder}
        width={35}
        height={35}
        alt="Picture of the author"
      />
    </div>
  );
}
