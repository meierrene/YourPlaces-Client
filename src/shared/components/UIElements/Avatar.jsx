import './Avatar.css';

function Avatar({ className, style, image, alt, width }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} style={{ width: width, height: width }} />
    </div>
  );
}

export default Avatar;
