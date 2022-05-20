import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetail,
  deleteActivity,
  filterActivities,
  getActivities,
} from "../../redux/actions";
import styles from "./countrydetail.module.css";
import NavBar from "../../components/NavBar/NavBar.jsx";

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryD = useSelector((state) => state.countryDetail);
  const history = useHistory();
  const [name, setName] = useState("");
  const deteleActivities = useSelector((state) => state.delete);

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log("Change eVALUE: ", e.target.value);
  }

  function handleDelete(e) {
    if (name !== "All") {
      dispatch(deleteActivity(name));
      console.log("EVALUE: ", name);
      alert("Activity deleted succesfully");
      setName("");
      history.push("/home");
    } else {
      dispatch(filterActivities(name));
    }
  }

  return (
    <div>
      <NavBar />

      {countryD.length > 0 && (
        <div className={styles.backDetail}>
          <div className={styles.countryDetail}>
            <img
              className={styles.flag}
              src={countryD[0].flag}
              alt="Flag not found"
            />
            <h2 className={styles.h2}>{countryD[0].name}</h2>
            <div className={styles.countryInfo}>
              <label className={styles.data}>
                <img
                  className={styles.iconsC}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAABmJLR0QA/wD/AP+gvaeTAAAIBElEQVR4nO2caYwURRSAv2UPQEURSRS5xAVBJajESBAxEMFbMBqNSMQramIgCki8QrzwCCQSzwSi/hEDghDxigeyC+yuiChCPECNouIREDnkENal/fGqUr0z1T19zsxqf0ln2K6qV6+r63j16jWQkZGRkZGRkZGRkRGailIrkENPYCxwCXCC+hvgZ+AH4G1gKbClJNqVMd2BOUAz4BS4WoCFQO+SaFqGjAF2I41zAFgAXAP0Bw5XV39gnEo7oPLuBi4rgb5lxSSkRzlIr+oToMyJwGuY3jgxNe3KnDFIA/wDTI5Qfqoq28L/sCd2xwzbKI2nmapk7AK6JaBXm+EFzLCNy2Ila04CstoEPZGhd4Bgc14hapWsZqRn/+eZiPSYBT55egCLkGG+G+ll/XzyL1Qyb09Ix7LmHeRhx3mk9wC2k2//bce7h41Xed5KVNMyZRPysCd5pC9S6W8iDdYdaRgHeNWjTH+V/nWimpYpevXtVCDd3dt6qns7Pcp0whjXRaVdyvJrgCeQ4aepyPnNxSmQbsMm0z38VwFVIeSVBTVAHeYhNF+qv8/2KKfNkreQ+bAH4kRwkOFtY5hK/8J1L3cOnRDlIUrJbETxn4ARrvtz1f2HPMqdBPyBfRHp61HmYbxtwQkq7Rta98ITgGnIi9oC7FG/jwHtfZ+sSOhGGJpz/wJ1fzPeU0h3ZMHYpa5FeDdeOyXLAc63pFcijecA96vrE+AQ3h6f1UCHAs+XOlrp3AZsh/j2HGB0AvWMVrJ+wPuF6F7ovvZgPD99kF53FmaKuS8B3WJxj1LkJUvadJW2OIF69Jw53SdPFVAP/Ir05vGIm8zGOUre+gR0i0UfpciPlrRuwH7EkzIoRh2DlIz9JOdM6IjpoSWlAvgbmWs6WtL1IrMkRh1LlIzZMWTk0gV/mzMVOgNXAE8iNtd3yBt0kGFj4zhgL9LAgyPUOViV3atk2fhI6ROGMxG9P4+gU2hqgXnIELKtZpuBi3zKz1L5lkeoW9uYM33yNAArPNLqVXout+FvcyZGBWLjOYh76kPgAcSU6If3JO3maGCbknFViLqvUmW2Ir0/Cg3AMsv9+Ur2pIhyAzNEVfQnslsoRAP24aTf+Gbsc2UuHTF2322BNA1OD+B3JXtgwrJbUQWsURU9ErDMKmCl5X4lsE7JmhFAzgyVd50qG5R6vOfDXsDzyKLnAN+T8pm5tvE2A0d45GnE3mA2hiHmyEH8zZrTVJ4WVSYMjeQP2aOBZzFHpS3AK0iDpsYpGPNklE8+ryHrxdPIQ6zB3rOqkC2Yo/ImwXrMHD4PGJCQXE8qgY+xb9xXYF/VgnIEZot3lyV9GmZ4efX6sOgz6VTnOzeTMUM31yFaj7fJEJTRGNuu1nW/L7CPwr0+LNrhcWyCMj3pBfylKrw4xXpeVHU0IsO2CmhS916IIbeR/BHyqZJ7Xgy5gXmDwqdpSdAZ+EXV9aC6HMRXF9XmA3iP/BEyj/iH+4G4BGPzeW2bkq7vEHLW26z+7bejiYo+Yn05BdmtWKEqusMjPcqesxDPYraEzyQsWzMA4+2uTqkOjsJ4b2/G7rRcgSwiSdIROeP4gmA7lKhoUybMVjIUlZhJ3AE2EN6ItdEbMWz3AB9gN14HkqyJ0US+4+ImzIFUmJ1NKCqRN7QBY7E/SLztzjJae27ej6ljEOrI3x1VAxuVDrPSVqAKMXIPYndkNiFKBkGbRPoq+qG4izMwLrlZFOFUbjRm4+0ObqxDhmMQPqD4PdCPSzFREQ0UIQB/EvEOX3ojjfYXYqOluoG30ES+YX05ZjSkNh9qqjG+s9oCecuRleQvKDr2Oi2zKQ99qJMbqubnSi9XRiLm2h5CnPDFDS7S4WS5UQMlPxIMSQ3wHDLvPQ78VqyK70R64PPFqjAmXl5p7SDeSMgVOG4P3Kh+T/XJ00Tyu5SotENsWDe9MVENExHvdNHogthPh5D4E9sLqSfasWWxeB3pffNLpcDdGFvuSyRAp61wEaL3LuD4UipyPeao8Q/gmFIqY6GO/LmvPSaCbErRNbJQA7yLKPRwiXXJxWZW3YtxIqTmygrLKESptTn3mxCXehQaCL6/DkpPTOzOyDiCkg4yX6N+T6b1XnInstBEYT/Su93YhmQYZiKhJ6+S/MuJzT7kzR6WYh22bZiNRvIbeiBiyuwjWEiKL2mE/jcjHuSo88oq5AWc65PHllaHPM9w1z0HcVa4uRcZeXNJ4L8OSKMB9XCzTQ8fIVEAwy1pmmai6VVNvpF8jiXfWPWbVHRD4qxG3vxS8huxAVmp3SzHP6LhZJW+BTmGHEU8X502Xa6NISNVajEfCwaJtrIF/bhlbSU/cHMDcDXRFsEpmBCRsvgexMZ5mPPcqDF8FZgo1LXA6cie9UdMQ36FRNyHcX7WIF4kB5kPy5ZbkQZsQU6+jiRcUJD+tmMbrWNXaoBbkB6kG3IT8r1H0KE9DhMoUG7/d04rtLtLh5DpoPMlyFAagn21rsY00HUesquBG4BvXXV8BlxYQKehiL/PQSLNyroBQQ7jdyBKaxvRfe3FxFePQOzHGzHOiULzXJWqQ8drO4gHKPcLqQrki3Z9GPY+EjTQ5uiLDM+5SAPlfrPWgokYHR9CbgekV+ugdQf5kHAIMn+6z6Gfog1+/upFV+Q0bDayWOjGW020k7EjkS9B9RGl+/oduDK+yuVNJXKoE/dYsSvwKDLn7kBO2rrGlJmRkZGRkZGRkZGRkQT/AgPXZNo9VEhpAAAAAElFTkSuQmCC"
                />
                Capital: {countryD[0].capital}
              </label>
              <label className={styles.data}>
                <img
                  className={styles.icons}
                  src="data:image/png;base64,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"
                />
                Continent: {countryD[0].continent}
              </label>
              <label className={styles.data}>
                <img
                  className={styles.icons}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAFC0lEQVR4nO2bz2seRRjHP7E2sWhiKUFMRCJB8OZB0NKoFSl4socai1i8eI3aXsR6sQcprUXEP8Cb0IIXEa0iqI1aoonij5tFUbQmsbYq1LbWNNTXwzyT3WxnZufXu/tS8oXhJTvPPPOdZ2e+8+zsBprHALAbmAXOS5kFngb6W+DTKG4BvgU6lvKN2FyVGKAY/ElgEhiUsgM4IXVfc5XOhN0Ug99kqN8E/Co2TzXIqzHMoQY36bDZKTafN8IoEKnidQ41uEGHzZDY/N0AnyDkEC+fANwoNuca4OONXOKll8AOh80k9UugcTHNJV7PiM0Jh5/vPfw0Lqa5xGsAdVc6QnAnas0PiW89+K/Ettt8vJEqXtuBaZRI2dZstZwHjgEPd4FPMFLE6wD+g7aV/Rn5RCFWvLbLtSXgOWA0oM9RYK+07bB6JuQSU2/Eite0XNub0Pfz4uOjDHyiESteeqqG3PkqRrlyLecS01rEiNdp4D1ga+maRvVvG2zttorv0wF8XGLqRA7xyh2A3GJqRU7xyhmA3GJqRU7xyhmA3GJqhRavkYQOR8gfgBx8vBKj3MR71Q8A13o4SoUP2ZztgnBNE530MpoIQJ8UE1zT2dUuG9ZmQNsE2oZLBHtNvLrCxzQDZiI7MuF4Bh+t8zEJle+1XvYDrGnAWgDWAtA2gbbRRAA2ANtKf88AvwBnS9fOyrWy4m+Ttq0jRnWHgT2o46iLpbrQclF87BGfsXys8Mm1tZM+z2tvok5eyu/lvgM+Ab4EfgJ+Rt31C1J/Peos/zZgHLgLmADuBNaJzSXgKPBIIJ/k5wmf6G5h9Z27jDrAfAy4KaHvIeAJ4B1WH7N1UIekIRyj4XI+DLyGGnAHdWK7H3UnfdEPHAIWWT1An3IYFeDWAvCH/C4BL6OmcSheInzg5fJnDcdkVB2trxA4Ctye4H9B/EwEthsDPqhwWV+q70oANqAG3AGWgWdJFxkdgPsi2vYBU8C/FDdDb53ZAzBIcWS+yGoRSsFB3FN8AbVMXF97TACnxH5auGYPwBxuorqcAl4FrvP0348Kgp4JtnKwxs8Y8IOBazJixemVHJ2jloaeCXW4FfixwiMZ2tFvqCjXYTPFTMiB+8XfvKf9GIprlgDob23+Ae7xbBNKuAxXTnAgwM+9FInToxE8APViUe/zUxYbF+G6NWuCKSeYRw0+9JO3KYpcJeq12hsUW4ttqzMRXqRetW2IzQlM6AM+FH9HQhvrDxwuoITFhpyEy/5icgITxlEfSfwX6nNGiLxQY5ebcF1OEJMnvCh23ifCD0qDM6jH1CYJ++YEIXnCRuAvsXmgZjwAvC3G+zxsu0E4FD55wj6xeavO2Qgqx1+iOIHJjZDExgc+2+4oalzLwM3liuqZ4C7U67J3UdtHN5Dy8GTadj+Vutcd7RaB91Fj2+Xq4GNxWv0QecDQcWrRS8A0KJtOpOQJj4v9MZvBRoppUj3YOJRx4AsyeE3YdSBS1YmUbXcYdXJ1CXXUdgUeEueml5G59/s63zadSN12v5D2K8f0ZQ24W35nHQ66+R6h7FvrRKdio9f5ceJmnx6j8bnmiBg9aaiz7fc+hxV1cOUS1QeglG23XA6biHwmlVsMdXUdp+zpJt+xD0B10Cm+8ZuDeakcD3CYe0/vNu5A8T2pL5TX3Q3yG7L/67W6zmnVO/hdflf+26SclCzTzIeTvYBlZHmVZ8BcO1xawcpO9z8Ra3r3g4CPwgAAAABJRU5ErkJggg=="
                />
                Population: {countryD[0].population}
              </label>
              <label className={styles.data}>
                <img
                  className={styles.icons}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAAEjElEQVRoge3ZaahWRRgH8J973cxcyKXIrGwhcSGzuAWiUEFGGShUlh/KwoKKCqP6UkS2WZRJRgQhVqYWFCERRauRWRqlLZJmC4lZWeae2337MHM6517u8p73Pe+9frh/OJwzZ+Z55v/M8szMM3SiEx2OfngHq+PzKS7uUEYZdG8jvw6vYivW4sIm+dPwVibdF/WZpx+24Gb8XADfijEapSbPatwRv/+W9tA6HGqmfAm/4JSo826sijJfYiO+wKm1NGRMJLIdf8bvN3A6DjRDeC8+xhxcjnExXcImzG/B0BI+wJm1NmQteuEyHBfzBmNs5hmJns3o6I0PM4QP4LooM0bo9e0aG9SjaEMGYh8aMLkKPXWCo9iPK5rJH4HnhB4tqbJn+uMRXI8+mf+zovKPqlGOrsLkbw1fxbpGV1PRy9Lu/UZqzDnx3+fVKC8Tq2NdY/MKds18j4vvzUJXL0a3qqnlw4H4noJhlSpJxudI/CGdeA9qvx5ZorEnW4MZeZX8KJ1o47GjidL2MKQOV2Op1JM14II8Sl6LgtNiuj9uwidR2SsFkS0X/aWNeWkewfui0KPN5A3W/BpRK/TAE5HPCnTJIzw5Cr5dPK9cmIlt0mFVn1fBSVH4t2J55caqyOM7YU0rC9nd79nxvbVAUpUg2Z5MExbIspBdR26L72eKYlQhksY9mEcoa8jJ8b2lEDqVY2d8n1+pgluEsfmDsNPtKEyJPP7CgEoU9BAORyXpMOsovB95rMebuFdOF3yJKlujIIzEHo13FlPzKlkeBW8tlFp+DMC5uF/g8y8W4ahyhLsIZ+gSJtaIYF50wwuCFyvhoXKE6mPhXzX2aIcD6oWVfi9ObKvw04Ihc2pMqlK8JPBb3Fqhbvg9FlyA87T/waotDBWcQKt7sJ5CyCbrKbbhrnYgmAezlbErrhNc8Dx8HwX2Y3g7ECwXvYXjeAlXliv0XhSYVSNSWVwjBD2eFAIerWGGwGtDOYqTaOJ+NQ5nCkNkg3RINwiGtYTusdyh7I+WMDvmP6tMy6vAeGH4bsIy4Yg9HycI7naHED9eLywNI6Jcm9uWcUKr7MaQAogOF1bpltamhUILPxDTS7UcI94tDZZvbKviZG6UtYq2ganSfdNmoaVHZPL7YJfQcEnEvjduFyKfc4XlYLl0edgjnOmPba3ii6Qbx74FGJJ4mORdwk+Z/BukMbRycIxgaJtIwpZ3lsu0FRwttHQJo4QzeEk4lydYEf9NL6C+/zEwKt2JIwvQ10Vo/RKuwj1SQybgrJj+R1jDCkMfaQsuw1N4XBhuWcOG4F2h91bieY3jXqOEC5410kueXsKBLTtxk7rmFmlEgunClVpTb7EL18Yyzd08ZQ8+85rkzczkTRA2pd9K5+KgWhhCiCwuwtex0iTW1CDc++0TXOAkwWUmV3IJPov/ZuC0VuoZqhj3ngs3anxvuDD+nxjT62J6mGDoQWGyH5YYJFzCjJJu8RcIhjwsTO4kGP5iRxCsBiulPbJM6vWO70hSleAMqXcqCY5iUocyqgJH4DG8roors0504jDEfxopYR+CAF5/AAAAAElFTkSuQmCC"
                />
                Area: {countryD[0].area} km²
              </label>
              <label className={styles.data}>
                <img
                  className={styles.icons}
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABmElEQVRoge3YMWsUQRiH8V+CCAYiWBiLpLKyFKzt7FLnK6QwhaWRNCnTWtqmsLjaLl8hhaBFKlNZmMJABEU0JsUy8CKB283d7s4c88AVd8wO/4e5eXfeoR2bWG45NmuucIo3WBs5y0xchc9vTPACS2OGug1J4gMuw/dPeIn740XrRgoO69jHt/D7Bd7h6SjpOhBFEnexhSP8C2OOsY17QwZsy00ikSc4wPcw9hxv8bj3dB2YJpJY1azGx/DMpWbVtnCnr4BtaSsSeabZNz/D8181K7cx13QduI1I4gFe4YsMSvgsIollTfAJ/oQ5T/BaI9w78xCJjFbC5y2SGLyE9yUSGaSEDyGS6LWEDykSeY73miqXMpxiFw/jwIXoMbpQ/1odSJv9XIGbPZbf2LwVU37TC/EszP1DIS/EeET5G+Ys5oiypgla7KGx6GN88Y1V0a3utJPrypAB2zLtOugXDhV0HfT/Bd1n7Cjwgm5hrkz38GjkLDMxVj/SmoXpR6pIblSR3KgiuVFFcqOK5EYVyY0qkhtVpNIT1xWNxnaPT91sAAAAAElFTkSuQmCC"
                />
                ID: {countryD[0].cca3}
              </label>
            </div>

            <label className={styles.act}>
              <h3 className={styles.h3}>Activities: </h3>
              <br />
              <div className={styles.a}>
                {countryD.length && countryD[0].activities.length
                  ? countryD[0].activities.map((a) => (
                      <div className={styles.divact}>
                        <h5 className={styles.acttitle}>{a.name}</h5>
                        Difficulty:
                        {" " + a.difficulty}
                        <br />
                        Duration:
                        {" " + a.duration}
                        <br />
                        Season:
                        {" " + a.season}
                        <br />
                      </div>
                    ))
                  : "No activities"}
              </div>
              <div className={styles.select1}>
                <select
                  className={styles.select}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option value="All">Activities</option>
                  {countryD[0].activities
                    ? countryD[0].activities.map((el) => {
                        return (
                          <>
                            <option value={el.name}> {el.name} </option>
                          </>
                        );
                      })
                    : "No activities in this country"}
                </select>
                <button
                  className={styles.btn}
                  onClick={(e) => handleDelete(name)}
                >
                  DELETE
                </button>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
