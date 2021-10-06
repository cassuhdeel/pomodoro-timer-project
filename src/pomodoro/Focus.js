import React from 'react'
import {minutesToDuration} from '../utils/duration'



export default function FocusTime ({focusDuration, higherFocus, lowerFocus, disableControl}) {

    return (
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                disabled = {disableControl} 
                onClick={lowerFocus}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                disabled = {disableControl}
                onClick={higherFocus}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>

        )}