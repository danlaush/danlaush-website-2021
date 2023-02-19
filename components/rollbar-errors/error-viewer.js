import React from "react";
import errors from './data/errors.js';

import styles from "./error-viewer.module.css";

const ErrorViewer = () => (
  <section>
    {errors.map((error) => (
      <div key={error.url}>
        <ErrorView error={error} />
      </div>
    ))}
  </section>
);

const ErrorView = ({ error }) => (
  <>
    <h3 className={styles.title}>
      <pre>{error.title}</pre>
    </h3>
    <p><a href={error.url}>Link</a></p>
    {error?.traces ? (<div className={styles.stacktrace}>
      <p><span style={{color:'red'}}>{error.traces.exception.class}</span>: {error.traces.exception.message}</p>
      <ul>
        {error.traces.frames.reverse().map(({filename, lineno, colno, method}, i) => <li key={i}>
          File <span style={{color:'forestgreen'}}>{filename}</span>{lineno ? `:${lineno}` : ''}{colno ? `:${colno}` : ''} in <span style={{color:'forestgreen'}}>{method}</span>
        </li>)}
      </ul>
    </div>) : undefined}
  </>
);

export default ErrorViewer;
