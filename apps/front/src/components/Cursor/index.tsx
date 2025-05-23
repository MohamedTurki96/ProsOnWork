import { useEffect, useState } from 'react';

const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => {
    // Find elements with the specified classes
    const e: any = document.querySelector('.tx-js-cursor');


    window.onmousemove = function (s: any) {
    
      e.style.transform = 'translate(' + s.clientX + 'px, ' + s.clientY + 'px)';
    };       

    e.style.visibility = 'visible';

    const anchors = document.getElementsByTagName('a');
    const buttons = document.getElementsByTagName('button');
    const elements = [...Array.from(anchors), ...Array.from(buttons)]
    elements.map((item: any) => {
      item.addEventListener('mouseover', () => {
        setIsHovered(true);
      });
      item.addEventListener('mouseout', () => {
        setIsHovered(false);
      });
    });
  }, [isHovered]);

  return (
    <>
      
        <div className={`xb-cursor tx-js-cursor is-enabled ${
          isHovered ? 'is-active' : ''
        }`}>
		<div className="xb-cursor-wrapper">
			<div className="xb-cursor--follower xb-js-follower"></div>
		</div>
	</div>
    </>
  );
};

export default Cursor;
