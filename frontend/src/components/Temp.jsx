{examData &&
        examData.questions.map((value, index) => {
          return (
            <div key={index} className="flex flex-grow m-2 p-2">
              <div className="flex flex-col">
                <div className="flex flex-grow">{parse(value.question)}</div>
                <div className=" flex">
                  <div>
                    Review Solution: {parse(examData.reviewSolutions[index])}
                  </div>
                  <div>{examData.timeTaken[index]}</div>
                  <div>{examData.totalTimeTaken}</div>
                </div>
                {/* <div>{examData.records[index]}Audio</div> */}
                {/* {examData.recordings[index] && (
                  <audio controls src={examData.recordings[index]}></audio>
                )} */}
              </div>
              <div>{parse(examData.codes[index])}</div>
            </div>
          );
        })}
