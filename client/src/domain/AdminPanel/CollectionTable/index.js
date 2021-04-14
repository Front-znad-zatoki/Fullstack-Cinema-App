/* eslint-disable react/no-array-index-key */
import { useContext, useEffect, useState } from 'react';
import { getCollection } from '../../../actions/Admin';
import CustomLoader from '../../../components/Loader';

const CollectionTable = ({ collectionName }) => {
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState(null);
  const [headers, setHeaders] = useState(null);
  const getHeaders = (item) => {
    const newHeaders = Object.keys(item).filter((header) => {
      if (
        header !== '__v' &&
        header !== 'isAdmin' &&
        header !== 'cinemaHallId' &&
        header !== 'description' &&
        header !== 'orders'
      ) {
        return true;
      }
      return false;
    });
    setHeaders(newHeaders);
  };
  useEffect(() => {
    setLoading(true);
    getCollection(collectionName, setCollection, setLoading);
  }, [collectionName]);
  useEffect(() => {
    setLoading(true);
    if (collection) {
      getHeaders(collection[0]);
    }
    setLoading(false);
  }, [collection]);

  const removeData = (id) => {
    // axios.delete(`${URL}/${id}`).then((res) => {
    //   const del = collection.filter(
    //     (collectionItem) => id !== collectionItem.id,
    //   );
    //   setCollection(del);
    // });
    console.log('removing');
  };

  const renderHeader = () => {
    if (headers) {
      return headers.map((key, index) => {
        return <th key={index}>{key.toUpperCase()}</th>;
      });
    }
  };

  const renderBody = () => {
    return (
      collection &&
      headers &&
      collection.map((item, index) => {
        return (
          <tr className="item__row item" key={`${index}row${item._id}`}>
            {headers.map((header, i) => {
              if (
                typeof item[header] !== 'string' &&
                typeof item[header] !== 'number'
              ) {
                if (Array.isArray(item[header])) {
                  if (
                    typeof item[header][0] === 'number' ||
                    typeof item[header][0] === 'string'
                  ) {
                    return (
                      <td className="item__cell" key={`${i}cell${item._id}`}>
                        {item[header].join(', ')}
                      </td>
                    );
                  }
                }
                if (item[header]) {
                  const dataEntries = Object.entries(item[header]).filter(
                    (newheader) => newheader !== '__v',
                  );
                  const formattedData = dataEntries
                    .map(([subheader, data]) => `${subheader}:${data}`)
                    .join('; ');
                  return (
                    <td className="item__cell" key={`${i}cell${item._id}`}>
                      {formattedData}
                    </td>
                  );
                }
              }
              return (
                <td className="item__cell" key={`${i}cell${item._id}`}>
                  {item[header]}
                </td>
              );
            })}
            <td className="item__cell item opration">
              <button className="button" onClick={() => removeData(item._id)}>
                Delete
              </button>
            </td>
          </tr>
        );
      })
    );
  };
  if (loading)
    return (
      <div className="admin__table">
        <CustomLoader />
      </div>
    );
  return (
    <div className="admin__table">
      <h4 className="admin__table__header">{collectionName}</h4>
      <table className="admin__table__container">
        <thead>
          <tr>{renderHeader()}</tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
    </div>
  );
};

export default CollectionTable;
