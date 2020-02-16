import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';
import { Dice, DiceResult } from 'vendor/nicer-dicer-engine';
import { Alert } from 'components/Alert/Alert';
import { RollResult } from 'features/rollResult/RollResult';
import { useDispatch, useSelector } from 'react-redux';
import { addRoll, setCurrentRoll } from 'features/rollInput/rollInputSlice';
import { RollList } from 'features/rollList/RollList';
import { RootState } from 'app/rootReducer';
import { useQuery } from 'utils/customHooks';
import { toggleModal } from 'components/Modal/modalSlice';
import { Slider } from 'components/Slider/Slider';
import Loader from 'components/Loader/Loader';
// Assets
import slide_01 from 'images/helper_slide1.png';
import slide_02 from 'images/helper_slide2.png';
import slide_03 from 'images/helper_slide3.png';
import slide_04 from 'images/helper_slide4.png';
import slide_05 from 'images/helper_slide5.png';
import slide_06 from 'images/helper_slide6.png';
import slide_07 from 'images/helper_slide7.png';

export const RollInput = () => {
  const dispatch = useDispatch();

  const [result, setResult] = useState<DiceResult>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  // Get currentRoll from Redux
  const { currentRoll, rolls } = useSelector((state: RootState) => state.rolls);
  const { animations } = useSelector((state: RootState) => state.settings);
  const query = useQuery();
  const history = useHistory();

  useEffect(() => {
    const rollQuery = query.get('roll');
    if (rollQuery && !rolls.length) {
      const queryRoll = decodeURIComponent(rollQuery);
      dispatch(setCurrentRoll(queryRoll));
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dice = new Dice(undefined, undefined, {
      renderExpressionDecorators: true,
    });
    try {
      const rollResult = dice.roll(currentRoll);
      if (animations) {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1600));
        setLoading(false);
      }
      setResult(rollResult);
      setError(undefined);
      dispatch(addRoll(currentRoll));
      ReactGA.event({
        category: 'Roll',
        action: 'Roll Submit',
        transport: 'beacon',
      });
      history.push(`/roller?roll=${encodeURIComponent(currentRoll)}`);
    } catch (error) {
      setError(error);
    }
  };

  // Render
  return (
    <div className="m-auto py-4">
      <div className="flex flex-col items-center">
        <form className="text-center w-full mb-4" onSubmit={handleSubmit}>
          <label htmlFor="formula-input" className="text-3xl">
            <span>Enter formula</span>
          </label>
          <button
            className="ml-2"
            type="button"
            onClick={() =>
              dispatch(
                toggleModal({
                  visible: true,
                  title: '',
                  content: (
                    <Slider
                      slides={[
                        <img src={slide_01} alt="slide1" />,
                        <img src={slide_02} alt="slide2" />,
                        <img src={slide_03} alt="slide3" />,
                        <img src={slide_04} alt="slide4" />,
                        <img src={slide_05} alt="slide5" />,
                        <img src={slide_06} alt="slide6" />,
                        <img src={slide_07} alt="slide7" />,
                      ]}
                    />
                  ),
                }),
              )
            }
          >
            <svg
              className="text-white fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM10.59 8.59a1 1 0 1 1-1.42-1.42 4 4 0 1 1 5.66 5.66l-2.12 2.12a1 1 0 1 1-1.42-1.42l2.12-2.12A2 2 0 0 0 10.6 8.6zM12 18a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
            </svg>
          </button>
          <input
            id="formula-input"
            className="text-lg w-full appearance-none text-sm font-mono flex bg-secondary-dark text-white text-center font-bold py-2 px-4 rounded mt-2 border border-yellow-700 focus:outline-none focus:border-yellow-400"
            type="text"
            value={currentRoll}
            onChange={e => dispatch(setCurrentRoll(e.target.value))}
          />

          <input
            className="hover:bg-secondary-dark bg-transparent w-full text-2xl text-white py-1 mt-2 px-4 border border-yellow-700 rounded"
            type="submit"
            value="Roll"
            disabled={loading}
          />
        </form>
        <div className="w-full text-wrap">
          {error ? (
            <div className="font-mono mb-6 m-auto">
              <Alert title={'Something went wrong'} body={error.message} />
            </div>
          ) : (
            <>
              {loading && animations && <Loader />}
              {result && !loading && <RollResult result={result} />}
              <RollList />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
