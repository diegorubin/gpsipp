from groups.domains.group import Group
from groups.domains.meeting import Meeting


def prepare(start, end):
    result = {}

    meetings = (Meeting.query
                .filter(Meeting.date >= start)
                .filter(Meeting.date <= end)).all()

    for meeting in meetings:
        week_number = meeting.date.isocalendar()[1]
        if week_number not in result:
            result[week_number] = []
        result[week_number].append({
            'group_name': Group.query.filter(Group.id == meeting.group_id).first().name,
            'number_of_children': meeting.number_of_children or 0,
            'number_of_participants': meeting.number_of_participants or 0,
            'number_of_visitors': meeting.number_of_visitors or 0
        })

    return result
