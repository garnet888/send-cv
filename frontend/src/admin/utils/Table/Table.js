import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { RenderTable, renderActions } from "./RendererFunc";
// import { useAuthContext } from "../../context/AuthContext";
import Axios from "../../../Axios";
import Loader from "../../../utils/Loader/Loader";
import Popup from "../../../utils/Popup/Popup";

import "./table.scss";

const _noIMG = require("../../../assets/no-image.png");
const _noFile = require("../../../assets/no-file.png");

const Table = ({
  currentHref,
  apiPath,
  apiSubPath,
  columns,
  rowCount,
  addButton,
  seeDetailOnClick,
  squarePhoto = false,
  disableSearch = false,
  disableActions = false,
  disableDeleteAct = false,
  disableSeeDetailAct = false,
  disablePagination = false,
  disableRowCount = false,
  disableGotoPage = false,
}) => {
  // const { axiosConfig } = useAuthContext();
  const axiosConfig = "";
  const navigate = useNavigate();

  const [DATA, setDATA] = useState([]);
  const [dataID, setDataID] = useState("");
  const [deletingRow, setDeletingRow] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [alertText, setAlertText] = useState("");
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [visibleError, setVisibleError] = useState(false);

  const showAlert = (id, text) => {
    setDataID(id);

    setAlertText(text);
    setVisibleAlert(true);
  };
  const showError = (text) => {
    setErrorText(text);
    setVisibleError(true);
  };

  function deleteOnHandle() {
    const API_PATH = apiPath + "/delete/" + dataID;

    Axios.delete(API_PATH, axiosConfig)
      .then((res) => {
        if (res.data.status === 409) {
          showError(res.data.message);
        } else {
          window.location.reload();
        }
      })
      .catch(() => showError());
  }

  function alertOnNO() {
    setVisibleAlert(false);

    setTimeout(() => {
      setDeletingRow("");
    }, 800);
  }

  useEffect(() => {
    function getProfileImg(data) {
      let profile = "";

      if (data && data.image) {
        profile = data.image;
      } else if (data && data.avatar) {
        profile = data.avatar;
      } else if (data && data.logo) {
        profile = data.logo;
      }

      if (!profile || String(profile).search("://") < 0) {
        return _noIMG;
      } else {
        return profile;
      }
    }

    if (apiPath) {
      // Axios.get(apiPath + apiSubPath ? apiSubPath : "")
      Axios.get(apiPath)
        .then((res) => {
          const { data: axiosData } = res;

          axiosData.map((item, idx) => {
            return (axiosData[idx] = {
              ...item,
              number: idx + 1,
              photo: (
                <img
                  className={`rcTable__img ${squarePhoto && "squarePhoto"}`}
                  src={getProfileImg(item)}
                  alt="no file"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = _noFile;
                  }}
                />
              ),
              date: moment(item.date).format("YYYY/MM/DD"),
              actions: renderActions({
                data_id: item.id,
                rowIdx: idx,
                currentHref,
                navigate,
                showAlert,
                setDeletingRow,
                seeDetailOnClick,
                disableDeleteAct,
                disableSeeDetailAct,
              }),
            });
          });

          setDATA(axiosData);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setIsError(true);
        });
    }
  }, [
    currentHref,
    apiPath,
    apiSubPath,
    squarePhoto,
    navigate,
    seeDetailOnClick,
    disableDeleteAct,
    disableSeeDetailAct,
  ]);

  const COLUMNS = useMemo(() => {
    let changedCol = [];

    if (columns) {
      if (disableActions) {
        changedCol = [
          {
            Header: "№",
            accessor: "number",
            disableFilters: true,
          },
          ...columns,
        ];
      } else {
        changedCol = [
          {
            Header: "№",
            accessor: "number",
            disableFilters: true,
          },
          ...columns,
          {
            Header: "Үйлдэл",
            accessor: "actions",
            disableSortBy: true,
            disableFilters: true,
          },
        ];
      }
    }

    return changedCol.map((col) => col);
  }, [columns, disableActions]);

  if (isLoading) {
    return (
      <div className="rcTable__noData">
        <Loader />
      </div>
    );
  } else {
    if (isError) {
      return (
        <div className="rcTable__noData">
          <p className="error-message">Ямар нэгэн алдаа гарлаа</p>
          <button
            className="error-reloadBtn"
            onClick={() => {
              setIsLoading(true);
              navigate(0);
            }}
          >
            Дахин оролдох
          </button>
        </div>
      );
    } else {
      return DATA?.length > 0 ? (
        <>
          <RenderTable
            data={DATA}
            columns={COLUMNS}
            rowCount={rowCount}
            addButton={addButton}
            deletingRow={deletingRow}
            disableSearch={disableSearch}
            disablePagination={disablePagination}
            disableRowCount={disableRowCount}
            disableGotoPage={disableGotoPage}
          />

          <Popup
            messageType="alert"
            messageText={alertText}
            visible={visibleAlert}
            onOk={() => deleteOnHandle()}
            onCancel={() => alertOnNO()}
          />

          <Popup
            messageType="error"
            messageText={errorText}
            visible={visibleError}
            onOk={() => window.location.reload()}
          />
        </>
      ) : (
        <div className="rcTable__noData">
          {addButton}
          Мэдээлэл хоосон байна
        </div>
      );
    }
  }
};

export default Table;
