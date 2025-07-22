CREATE TABLE notification (
    notification_uuid uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    notification_type varchar(50) NOT NULL,
    message text NOT NULL,
    user_uuid uuid NOT NULL,
    is_read boolean DEFAULT false,
    related_task_uuid uuid,
    related_quote_uuid uuid,
    related_session_uuid uuid,
    related_invite_uuid uuid,
    PRIMARY KEY (notification_uuid),
    CONSTRAINT fk_notification_user FOREIGN KEY (user_uuid) REFERENCES "user"(user_uuid),
    CONSTRAINT fk_notification_task FOREIGN KEY (related_task_uuid) REFERENCES maintenancetask(task_uuid),
    CONSTRAINT fk_notification_quote FOREIGN KEY (related_quote_uuid) REFERENCES quote(quote_uuid),
    CONSTRAINT fk_notification_session FOREIGN KEY (related_session_uuid) REFERENCES quote_vote_session(session_uuid),
    CONSTRAINT fk_notification_invite FOREIGN KEY (related_invite_uuid) REFERENCES trustee_bodycoporate_invite(invite_uuid)
);

CREATE INDEX idx_notification_user ON notification (user_uuid);
CREATE INDEX idx_notification_type ON notification (notification_type);