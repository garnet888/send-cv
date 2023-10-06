import React from "react";
import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();

  return (
    <div className="detail">
      <div className="detail__heading">
        <h3 className="detail__heading-jobName">
          Job's Name {parseInt(id) + 1}
          <p className="detail__heading-jobName-salary">
            2.100.000₮ - 2.500.000₮ / Job Type / Work time type
          </p>
        </h3>

        <p className="detail__heading-date">10-р сарын 01, 13:04</p>
      </div>

      <div className="detail__content">
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
