from groups.domains.group import Group
from groups.domains.meeting import Meeting


def prepare(start, end):
    result = {
        'groups': [],
        'meetings': {}
    }

    for group in Group.query.order_by(Group.name).all():
        result['groups'].append({
            'name': group.name,
            'id': group.id
        })

    meetings = (Meeting.query
                .filter(Meeting.date >= start)
                .filter(Meeting.date <= end)).all()

    initial_week_number = start.isocalendar()[1]

    result['weeks'] = list(range(1, end.isocalendar()[1] - initial_week_number))
    for meeting in meetings:
        week_number = meeting.date.isocalendar()[1] - initial_week_number + 1
        if meeting.group_id not in result['meetings']:
            result['meetings'][meeting.group_id] = {}

        if week_number not in result['meetings'][meeting.group_id]:
            result['meetings'][meeting.group_id][week_number] = {}

        result['meetings'][meeting.group_id][week_number] = {
            'group_id': meeting.group_id,
            'number_of_children': meeting.number_of_children or 0,
            'number_of_participants': meeting.number_of_participants or 0,
            'number_of_visitors': meeting.number_of_visitors or 0
        }

    return result
