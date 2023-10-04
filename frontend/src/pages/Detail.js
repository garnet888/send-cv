import React from "react";
import { useParams } from "react-router-dom";

const _exLogo1 =
  "https://t4.ftcdn.net/jpg/02/04/59/29/360_F_204592965_Xgu7wwQEj8QSnmI0HALnFzyBAIUOMz0j.jpg";
const _exLogo2 =
  "https://logo.com/image-cdn/images/kts928pd/production/9b98774a34ba33e8298f12960875c0796b7b0a66-900x550.png?w=1080&q=72";

const Detail = () => {
  const { id } = useParams();

  return (
    <div className="detail">
      <div className="detail__heading">
        <figure className="detail__heading-fig">
          <img
            className="detail__heading-fig-logo"
            src={id % 2 === 0 ? _exLogo1 : _exLogo2}
            alt="no file"
          />

          <figcaption className="detail__heading-fig-name">
            Organization's Name {parseInt(id) + 1}
          </figcaption>
        </figure>

        <p className="detail__heading-date">10-р сарын 01, 13:04</p>
      </div>

      <div className="detail__content">
        <h3 className="detail__content-workName">
          Work Name {parseInt(id) + 1}
          <p className="detail__content-workName-salary">
            2.100.000₮ - 2.500.000₮ / Work Type / Бүтэн цагийн
          </p>
        </h3>

        <div className="detail__content-text">
          <b>Ажлын байрны зорилго/үүрэг:</b>

          <p>
            Хүүхдийн өвчлөл гэмтлийг оношилж эмчлэх ба хүүхдийн өвчнөөс
            урьдчилан сэргийлэхэд туслах Хүүхдийн хооллолт, өдөр тутмын үйл
            ажиллагаа, ариун цэвэр, эрүүл ахуйн өвчнөөс урьдчилан сэргийлэх
            зөвлөгөө үйлчилгээг батлагдсан стандарт, удирдамжийн дагуу
            мэргэжлийн өндөр түвшинд үзүүлэх
          </p>
        </div>

        <div className="detail__content-text">
          <b>Тавигдах шаардлага:</b>

          <p>
            - Хүүхдийн эмчийн мэргэшлийн сургалтад хамрагдсан, үнэмлэхтэй байх
            <br />
            - Мэргэжлээрээ 2 ба түүнээс дээш жил ажилласан байх
            <br />
            - Анагаах ухааны боловсрол олгох их, дээд сургуулийг хүний их эмч
            мэргэжлээр бакалавр болон түүнээс дээш зэрэгтэй төгссөн цэвэр, эрүүл
            ахуйн өвчнөөс урьдчилан сэргийлэх зөвлөгөө үйлчилгээг
            <br />
            - Эмчлэх үйл ажиллагаа эрхлэх зөвшөөрөлтэй байх
            <br />
            - Англи хэлний дундаас дээш түвшний мэдлэгтэй
            <br />
            - Компьютерын хэрэглээний программуудыг бүрэн эзэмшсэн
            <br />- Эмнэлгийн мэргэжилтний ёс зүйн хэмжээг эрхэмлэн дээдэлдэг,
            харилцаа хандлага сайтай
          </p>
        </div>
      </div>

      <button className="detail__sendCV">CV илгээх</button>
    </div>
  );
};

export default Detail;
