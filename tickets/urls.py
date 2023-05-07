from django.urls import path, include, re_path
from tickets.views import (edit_ticket, index, view_ticket, delete_attachment,
                           delete_comment, delete_ticket, ticket_status, edit_comment,
                           ticket_comment, admin_tickets_list, admin_ticket_view,
                           new_ticket
                           )

app_name = "tickets"

urlpatterns = [
    re_path(r'^$', index, name="index"),
    re_path(r'ticket/edit/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', edit_ticket, name="edit_ticket"),
    re_path(r'ticket/view/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', view_ticket, name="view_ticket"),
    re_path(r'attachment/delete/(?P<attachment_id>[a-zA-Z0-9_-]+)/$', delete_attachment, name="delete_attachment"),
    re_path(r'comment/delete/(?P<comment_id>[a-zA-Z0-9_-]+)/$', delete_comment, name="delete_comment"),
    re_path(r'ticket/delete/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', delete_ticket, name="delete_ticket"),
    re_path(r'status/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', ticket_status, name="ticket_status"),
    re_path(r'comment/edit/$', edit_comment, name="edit_comment"),
    re_path(r'comment/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', ticket_comment, name="ticket_comment"),
    re_path(r'ticket/list/$', admin_tickets_list, name="admin_tickets_list"),
    re_path(r'dashboard/ticket-view/(?P<ticket_id>[a-zA-Z0-9_-]+)/$', admin_ticket_view, name="admin_ticket_view"),
    re_path(r'ticket/new/$', new_ticket, name="new_ticket"),
]
