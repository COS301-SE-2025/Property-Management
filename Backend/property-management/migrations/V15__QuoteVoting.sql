CREATE TABLE quote_vote_session (
    session_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_uuid UUID NOT NULL,
    coporate_uuid UUID NOT NULL,
    voting_ends_at TIMESTAMP NOT NULL,

    CONSTRAINT fk_session_task FOREIGN KEY (task_uuid) REFERENCES maintenancetask(task_uuid),
    CONSTRAINT fk_session_coporate FOREIGN KEY (coporate_uuid) REFERENCES bodycoporate(coporate_uuid)
);

CREATE TABLE quote_vote (
    vote_uuid UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_uuid UUID NOT NULL,
    quote_uuid UUID NOT NULL,
    voter_uuid UUID NOT NULL,
    is_trustee BOOLEAN NOT NULL,
    vote_for BOOLEAN NOT NULL,
    voted_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_vote_session FOREIGN KEY (session_uuid) REFERENCES quote_vote_session(session_uuid),
    CONSTRAINT fk_vote_quote FOREIGN KEY (quote_uuid) REFERENCES quote(quote_uuid),
    CONSTRAINT unique_vote_per_user_per_quote_per_session UNIQUE (session_uuid, quote_uuid, voter_uuid)
);
